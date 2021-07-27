import { Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ConfiguratorAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
  /**
   * Checks if quantity control should be disabled.
   *
   * @return {boolean} - Disable quantity picker?
   */
  get disableQuantityActions(): boolean {
    return (
      this.quantityService?.disableQuantityActions(
        this.attribute?.selectedSingleValue
      ) ?? true
    );
  }

  /**
   * Fires an event when a value has been selected.
   *
   * @param {string} value - selected value
   */
  onSelect(value: string): void {
    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        selectedSingleValue: value,
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.ATTRIBUTE,
    };

    this.emitEvent(event);
  }

  /**
   * Fires an event when the quantity has been changed.
   *
   * @param {any} eventObject - event object
   * @param {FormControl} form - Form control
   */
  onChangeQuantity(eventObject: any, form?: FormControl): void {
    if (!eventObject) {
      if (form) {
        form.setValue('0');
      }
      this.onSelect('');
    } else {
      this.onHandleQuantity(eventObject);
    }
  }

  protected getInitialQuantity(form?: FormControl): number {
    const quantity: number = this.attribute?.quantity ?? 0;
    if (form) {
      return form?.value !== '0' ? quantity : 0;
    } else {
      return this.attribute?.selectedSingleValue ? quantity : 0;
    }
  }

  /**
   *  Extract corresponding quantity parameters.
   *
   * @param {FormControl} form - Form control
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(
    form?: FormControl
  ): ConfiguratorAttributeQuantityComponentOptions {
    const initialQuantity = this.getInitialQuantity(form);
    const disableQuantityActions$ = this.loading$.pipe(
      map((loading) => {
        return loading || this.disableQuantityActions;
      })
    );

    return {
      allowZero: !this.attribute?.required,
      initialQuantity: initialQuantity,
      disableQuantityActions$: disableQuantityActions$,
    };
  }

  /**
   * Extract corresponding price formula parameters.
   * For the single-selection attribute types the complete price formula should be displayed at the attribute level.
   *
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    return {
      quantity: this.attribute?.quantity,
      price: this.getSelectedValuePrice(),
      priceTotal: this.attribute?.attributePriceTotal,
      isLightedUp: true,
    };
  }

  /**
   * Extract corresponding value price formula parameters.
   * For the single-selection attribute types only value price should be displayed at the value level.
   *
   * @param {Configurator.Value} value - Configurator value
   * @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractValuePriceFormulaParameters(
    value?: Configurator.Value
  ): ConfiguratorPriceComponentOptions | undefined {
    if (value) {
      return {
        price: value.valuePrice,
        isLightedUp: value.selected,
      };
    }
  }

  protected getSelectedValuePrice(): Configurator.PriceDetails | undefined {
    return this.attribute?.values?.find((value) => value?.selected)?.valuePrice;
  }
}
