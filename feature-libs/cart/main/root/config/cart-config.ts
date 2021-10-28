import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
// Imported for side effects (module augmentation)
import '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CartConfig {
  cart?: {
    selectiveCart?: {
      enabled?: boolean;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends CartConfig {}
}