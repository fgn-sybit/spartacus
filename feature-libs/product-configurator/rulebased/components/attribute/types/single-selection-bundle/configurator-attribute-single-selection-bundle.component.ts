import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorUiKeyGeneratorService } from '../base/configurator-ui-key-generator.service';

@Component({
  selector: 'cx-configurator-attribute-single-selection-bundle',
  templateUrl:
    './configurator-attribute-single-selection-bundle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeSingleSelectionBundleComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
  constructor(
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected uiKeyGeneratorService: ConfiguratorUiKeyGeneratorService
  ) {
    super(quantityService, uiKeyGeneratorService);
  }
  /**
   * Extract corresponding product card parameters
   *
   * @param {Configurator.Value} value - Value
   * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
   */
  extractProductCardParameters(
    value: Configurator.Value
  ): ConfiguratorAttributeProductCardComponentOptions {
    return {
      hideRemoveButton: this.attribute?.required,
      fallbackFocusId: this.getFocusIdOfNearestValue(value),
      productBoundValue: value,
      loading$: this.loading$,
      attributeId: this.getAttributeCode(this.attribute),
    };
  }

  protected getFocusIdOfNearestValue(currentValue: Configurator.Value): string {
    if (!this.attribute.values) {
      return 'n/a';
    }
    let prevIdx = this.attribute?.values.findIndex(
      (value) => value?.valueCode === currentValue?.valueCode
    );
    prevIdx--;
    if (prevIdx < 0) {
      prevIdx = this.attribute?.values?.length > 1 ? 1 : 0;
    }
    return this.createFocusId(
      this.getAttributeCode(this.attribute).toString(),
      this.attribute?.values[prevIdx]?.valueCode
    );
  }
}
