import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  AddToCartModule,
  CartSharedModule,
  IconModule,
  ItemCounterModule,
  ModalModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CompactAddToCartComponent } from './compact-add-to-cart.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartSharedModule,
    RouterModule,
    SpinnerModule,
    PromotionsModule,
    FeaturesConfigModule,
    UrlModule,
    IconModule,
    I18nModule,
    ItemCounterModule,
    ModalModule,
    AddToCartModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CompactAddToCartComponent: {
          component: CompactAddToCartComponent,
          data: {
            inventoryDisplay: false,
          },
        },
      },
    }),
  ],
  declarations: [CompactAddToCartComponent],
  exports: [CompactAddToCartComponent],
})
export class CompactAddToCartModule {}
