
import { FormControl } from '@angular/forms';

export type ToFormControls<T, ExcludeKeys extends keyof T = never> = {
  [K in Exclude<keyof T, ExcludeKeys>]: FormControl<T[K] | null>;
};
