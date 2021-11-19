import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutStepService,
  ReviewSubmitComponent,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  CostCenter,
  PaymentType,
  TranslationService,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-review-submit',
  templateUrl: './review-submit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BReviewSubmitComponent extends ReviewSubmitComponent {
  constructor(
    protected checkoutDeliveryAddressService: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected userAddressService: UserAddressService,
    protected activeCartService: ActiveCartService,
    protected translation: TranslationService,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutPaymentTypeService: CheckoutPaymentTypeFacade,
    protected checkoutCostCenterService: CheckoutCostCenterFacade,
    protected checkoutDeliveryModesService: CheckoutDeliveryModesFacade,
    protected userCostCenterService: UserCostCenterService
  ) {
    super(
      checkoutDeliveryAddressService,
      checkoutPaymentService,
      userAddressService,
      activeCartService,
      translation,
      checkoutStepService,
      checkoutDeliveryModesService
    );
  }

  get poNumber$(): Observable<string | undefined> {
    return this.checkoutPaymentTypeService.getPurchaseOrderNumberState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );
  }

  get paymentType$(): Observable<PaymentType | undefined> {
    return this.checkoutPaymentTypeService.getSelectedPaymentTypeState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );
  }

  get isAccountPayment$(): Observable<boolean> {
    return this.checkoutPaymentTypeService.isAccountPayment();
  }

  /**
   *  TODO:#checkout - since the `getCostCenterState` returns the actual cost center,
   * there's no need to use userCostCenterService.getActiveCostCenters()?
   */
  get costCenter$(): Observable<CostCenter | undefined> {
    return this.userCostCenterService.getActiveCostCenters().pipe(
      filter((costCenters) => !!costCenters),
      switchMap((costCenters) =>
        this.checkoutCostCenterService
          .getCostCenterState()
          .pipe(
            map((state) =>
              costCenters.find((cc) => cc.code === state?.data?.code)
            )
          )
      )
    );
  }

  protected getCheckoutPaymentSteps(): Array<CheckoutStepType | string> {
    return [
      CheckoutStepType.PAYMENT_DETAILS,
      CheckoutStepType.PAYMENT_TYPE,
      CheckoutStepType.SHIPPING_ADDRESS,
    ];
  }

  getCostCenterCard(costCenter?: CostCenter): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutB2B.costCenter'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: costCenter?.name,
          text: ['(' + costCenter?.unit?.name + ')'],
        };
      })
    );
  }

  getPoNumberCard(poNumber?: string | null): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutB2B.review.poNumber'),
      this.translation.translate('checkoutB2B.noPoNumber'),
    ]).pipe(
      map(([textTitle, noneTextTitle]) => {
        return {
          title: textTitle,
          textBold: poNumber ? poNumber : noneTextTitle,
        };
      })
    );
  }

  getPaymentTypeCard(paymentType: PaymentType): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutB2B.progress.methodOfPayment'),
      this.translation.translate(
        'paymentTypes.paymentType_' + paymentType.code
      ),
    ]).pipe(
      map(([textTitle, paymentTypeTranslation]) => {
        return {
          title: textTitle,
          textBold: paymentTypeTranslation,
        };
      })
    );
  }
}