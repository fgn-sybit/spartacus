import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  NameSource,
  FilesFormValidators,
  ImportCsvService,
  ProductImportInfo,
  ProductImportStatus,
  ProductsData,
  CmsImportEntriesComponent,
} from '@spartacus/cart/import-export/core';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import {
  CmsComponentData,
  FileUploadModule,
  FormErrorsModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ImportToCartService } from '../../import-to-cart.service';
import { ImportEntriesFormComponent } from './import-entries-form.component';

const mockLoadFileData: string[][] = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockCmsComponentData: CmsImportEntriesComponent = {
  fileValidity: {
    maxSize: 1,
    allowedExtensions: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      '.csv',
    ],
  },
  cartNameGeneration: {
    source: NameSource.FILE_NAME,
  },
};

const mockCsvString =
  'Sku,Quantity,Name,Price\n693923,1,mockProduct1,$4.00\n232133,2,"mockProduct2",$5.00';

const mockFile: File = new File([mockCsvString], 'mockFile.csv', {
  type: 'text/csv',
});

const mockProducts: ProductsData = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const mockLoadProduct: ProductImportInfo = {
  productCode: '123456',
  statusCode: ProductImportStatus.SUCCESS,
};

const cmsComponentDataSubject = new BehaviorSubject<CmsImportEntriesComponent>(
  mockCmsComponentData
);

const MockCmsComponentData = <CmsComponentData<CmsImportEntriesComponent>>{
  data$: cmsComponentDataSubject.asObservable(),
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockImportToCartService implements Partial<ImportToCartService> {
  loadProductsToCart = () => of(mockLoadProduct);
  isDataParsableToProducts = () => true;
  csvDataToProduct = () => mockProducts;
}

class MockImportCsvService implements Partial<ImportCsvService> {
  loadFile = () => of(mockCsvString);
  loadCsvData = () => of(mockLoadFileData);
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('ImportEntriesFormComponent', () => {
  let component: ImportEntriesFormComponent;
  let fixture: ComponentFixture<ImportEntriesFormComponent>;
  let launchDialogService: LaunchDialogService;
  let importToCartService: ImportToCartService;
  let filesFormValidators: FilesFormValidators;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormErrorsModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        I18nTestingModule,
      ],
      declarations: [ImportEntriesFormComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ImportToCartService, useClass: MockImportToCartService },
        { provide: ImportCsvService, useClass: MockImportCsvService },
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportEntriesFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    launchDialogService = TestBed.inject(LaunchDialogService);
    importToCartService = TestBed.inject(ImportToCartService);
    filesFormValidators = TestBed.inject(FilesFormValidators);

    spyOn(importToCartService, 'loadProductsToCart').and.callThrough();
    spyOn(filesFormValidators, 'maxSize').and.callThrough();
    spyOn(filesFormValidators, 'parsableFile').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the file Validity', () => {
    expect(component.fileValidity).toEqual(mockCmsComponentData.fileValidity);
  });

  it('should close dialog on close method', () => {
    const mockCloseReason = 'Close Import Products Dialog';
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });

  it('should build the form', () => {
    expect(component.form?.get('file')?.value).toBeDefined();
    expect(component.form?.get('name')?.value).toBeDefined();
    expect(component.form?.get('description')?.value).toBeDefined();
  });

  it('should validate maximum size and parsable file while building form', () => {
    expect(filesFormValidators.maxSize).toHaveBeenCalled();
    expect(filesFormValidators.parsableFile).toHaveBeenCalled();
  });

  it('should trigger submit event when save method is called', () => {
    component.form.get('file')?.setValue([mockFile]);
    const mockSubmitData = {
      products: mockProducts,
      name: '',
      description: '',
    };
    spyOn(component.submitEvent, 'emit');
    component.save();

    expect(component.submitEvent.emit).toHaveBeenCalledWith(mockSubmitData);
  });

  describe('updateCartName', () => {
    it('should call updateCartName on event change', () => {
      spyOn(component, 'updateCartName').and.callThrough();
      el.query(By.css('cx-file-upload')).triggerEventHandler('update', null);

      expect(component.updateCartName).toHaveBeenCalled();
    });

    it('should update cart name based on the file name', () => {
      cmsComponentDataSubject.next({
        ...cmsComponentDataSubject.value,
        cartNameGeneration: {
          source: NameSource.FILE_NAME,
        },
      });
      component.ngOnInit();

      component.form.get('file')?.setValue([mockFile]);
      el.query(By.css('cx-file-upload')).triggerEventHandler('update', null);

      expect(component.form.get('name')?.value).toEqual('mockFile');
    });

    it('should update cart name based on date', () => {
      cmsComponentDataSubject.next({
        ...cmsComponentDataSubject.value,
        cartNameGeneration: {
          source: NameSource.DATE_TIME,
          fromDateOptions: {
            prefix: 'cart_',
            mask: 'yyyy/MM/dd_hh:mm',
          },
        },
      });
      component.ngOnInit();

      component.form.get('file')?.setValue([mockFile]);
      el.query(By.css('cx-file-upload')).triggerEventHandler('update', null);

      expect(component.form.get('name')?.value).toContain(`cart_`);
    });

    it('should not update cart name if it is not enabled', () => {
      cmsComponentDataSubject.next({
        ...cmsComponentDataSubject.value,
        cartNameGeneration: {},
      });
      component.ngOnInit();

      component.form.get('file')?.setValue([mockFile]);
      el.query(By.css('cx-file-upload')).triggerEventHandler('update', null);

      expect(component.form.get('name')?.value).toEqual('');
    });
  });
});
