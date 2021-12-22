import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveCartOrderEntriesContextToken } from '@spartacus/cart/main/root';
import { OutletModule, PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { AddToCartModule } from './cart/add-to-cart/add-to-cart.module';
import { CartDetailsModule } from './cart/cart-details/cart-details.module';
import { CartPageLayoutHandler } from './cart/cart-page-layout-handler';
import { CartSharedModule } from './cart/cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart/cart-totals/cart-totals.module';
import { ActiveCartOrderEntriesContext } from './cart/page-context/active-cart-order-entries.context';
import { SaveForLaterModule } from './cart/save-for-later/save-for-later.module';
import { CartComponentsEventModule } from './events/cart-components-event.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    SaveForLaterModule,
    OutletModule.forChild(),
    CartComponentsEventModule,
  ],
  exports: [
    CartDetailsModule,
    CartTotalsModule,
    CartSharedModule,
    AddToCartModule,
    SaveForLaterModule,
  ],
  providers: [
    {
      provide: PAGE_LAYOUT_HANDLER,
      useExisting: CartPageLayoutHandler,
      multi: true,
    },
    {
      provide: ActiveCartOrderEntriesContextToken,
      useExisting: ActiveCartOrderEntriesContext,
    },
  ],
})
export class CartComponentsModule {}