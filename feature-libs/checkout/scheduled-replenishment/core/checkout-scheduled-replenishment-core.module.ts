import { NgModule } from '@angular/core';
import { CheckoutReplenishmentOrderConnector } from './connectors/replenishment-order/checkout-replenishment-order.connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [...facadeProviders, CheckoutReplenishmentOrderConnector],
})
export class CheckoutScheduledReplenishmentCoreModule {}
