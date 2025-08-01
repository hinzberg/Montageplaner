import { AbstractControl, ValidationErrors } from '@angular/forms';

export function basicTextValidation(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    if (value !== value.trim()) {
      return { hasSpaces: true };
    }

    if (!/^[a-zA-ZäöüßÄÖÜ\s]*$/.test(value)) {
      return { invalidCharacters: true };
    }

    if (value.length < 2) {
      return { minlength: { requiredLength: 2, actualLength: value.length } };
    }

    if (value.length > 50) {
      return { maxlength: { requiredLength: 50, actualLength: value.length } };
    }

    return null;
  };
}
