import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { ActiveCartFacade } from '../../facade/active-cart.facade';
import { MiniCartComponentService } from './mini-cart-component.service';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  iconTypes = ICON_TYPE;

  quantity$: Observable<number> = this.miniCartComponentService
    .browserHasCartInStorage()
    .pipe(
      switchMap((hasCart) => {
        if (hasCart) {
          console.log(
            'quantity$ browserHasCartInStorage == true, using cart facade'
          );
          return this.activeCartService.getActive().pipe(
            startWith({ deliveryItemsQuantity: 0 }),
            map((cart) => cart.deliveryItemsQuantity || 0)
          );
        } else {
          console.log(
            'quantity$ browserHasCartInStorage == false, using default 0 count'
          );
          return of(0);
        }
      })
    );

  total$: Observable<string> = this.miniCartComponentService
    .browserHasCartInStorage()
    .pipe(
      switchMap((hasCart) => {
        if (hasCart) {
          console.log(
            'total$: - browserHasCartInStorage == true, using cart facade'
          );
          return this.activeCartService.getActive().pipe(
            filter((cart) => !!cart.totalPrice),
            map((cart) => cart.totalPrice?.formattedValue ?? '')
          );
        } else {
          console.log(
            'total$: - browserHasCartInStorage == false, using default 0 count'
          );
          return of('');
        }
      })
    );

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected miniCartComponentService: MiniCartComponentService
  ) {}

  /*
  browserHasCartInStorage(): Observable<boolean> {
    return this.eventService.get(CartPersistentStorageChangeEvent).pipe(
      startWith(this.createEventFromStorage()),
      tap((event) =>
        console.log('browser storage active value: ', event?.state?.active)
      ),
      map((event) => Boolean(event?.state?.active)),
      distinctUntilChanged(),
      tap((active) => console.log('browser storage actiive boolean: ', active)),
      takeWhile((hasCart) => !hasCart, true)
    );
  }

  createEventFromStorage() {
    const event = new CartPersistentStorageChangeEvent();
    event.state = this.getCartStateFromBrowserStorage();
    return event;
  }

  getCartStateFromBrowserStorage(): { active: string } {
    const state = this.statePersistenceService.readStateFromStorage({
      key: 'cart',
      context: this.siteContextParamsService.getValue(BASE_SITE_CONTEXT_ID),
      storageType: this.config?.cart?.storageType,
    });
    return state as { active: string };
  }
  */
}
