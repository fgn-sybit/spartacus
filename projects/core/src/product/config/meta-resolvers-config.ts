import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class MetaResolversConfig {
  categoryPageMetaResolver?: {
    productListComponents?: string[];
  };
}
