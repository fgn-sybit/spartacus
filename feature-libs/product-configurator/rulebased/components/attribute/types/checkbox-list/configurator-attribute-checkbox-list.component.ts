import {
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';
import { ConfiguratorUiKeyGeneratorService } from '../base/configurator-ui-key-generator.service';

@Component({
  selector: 'cx-configurator-attribute-checkbox-list',
  templateUrl: './configurator-attribute-checkbox-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeCheckBoxListComponent
  extends ConfiguratorAttributeMultiSelectionBaseComponent
  implements OnInit {
  attributeCheckBoxForms = new Array<FormControl>();

  /**
   * @deprecated since 4.1: remove redundant input parameter
   */
  @Input() group: string;

  constructor(
    /**
     * @deprecated since 4.1: remove ConfiguratorStorefrontUtilsService dependency
     */
    protected configUtilsService: ConfiguratorStorefrontUtilsService,
    protected quantityService: ConfiguratorAttributeQuantityService,
    protected uiKeyGeneratorService: ConfiguratorUiKeyGeneratorService
  ) {
    super(quantityService, uiKeyGeneratorService);
  }

  ngOnInit(): void {
    const disabled = !this.allowZeroValueQuantity;

    if (this.attribute.values) {
      for (const value of this.attribute.values) {
        let attributeCheckBoxForm;

        if (value.selected) {
          attributeCheckBoxForm = new FormControl({
            value: true,
            disabled: disabled,
          });
        } else {
          attributeCheckBoxForm = new FormControl(false);
        }
        this.attributeCheckBoxForms.push(attributeCheckBoxForm);
      }
    }
  }

  get allowZeroValueQuantity(): boolean {
    return (
      this.quantityService?.allowZeroValueQuantity(this.attribute) ?? false
    );
  }

  onSelect(): void {
    super.onSelect(
      this.assembleValuesForMultiSelectAttributes(
        this.attributeCheckBoxForms,
        this.attribute
      )
    );
  }

  onChangeValueQuantity(
    eventObject: any,
    valueCode: string,
    formIndex: number
  ): void {
    if (eventObject === 0) {
      this.attributeCheckBoxForms[formIndex].setValue(false);
      this.onSelect();
      return;
    }

    const value:
      | Configurator.Value
      | undefined = this.assembleValuesForMultiSelectAttributes(
      this.attributeCheckBoxForms,
      this.attribute
    ).find((item) => item.valueCode === valueCode);

    if (!value) {
      if (isDevMode()) {
        console.warn('no value for event:', eventObject);
      }

      return;
    }

    value.quantity = eventObject;

    const event: ConfigFormUpdateEvent = {
      changedAttribute: {
        ...this.attribute,
        values: [value],
      },
      ownerKey: this.ownerKey,
      updateType: Configurator.UpdateType.VALUE_QUANTITY,
    };

    this.emitEvent(event);
  }

  onChangeQuantity(eventObject: any): void {
    if (!eventObject) {
      this.attributeCheckBoxForms.forEach((_, index) =>
        this.attributeCheckBoxForms[index].setValue(false)
      );
      this.onSelect();
    } else {
      this.onHandleQuantity(eventObject);
    }
  }
}
