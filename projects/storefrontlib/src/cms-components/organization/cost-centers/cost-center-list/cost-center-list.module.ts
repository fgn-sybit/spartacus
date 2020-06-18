import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { CostCenterListComponent } from './cost-center-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
  ],
  declarations: [CostCenterListComponent],
})
export class CostCenterListModule {}
