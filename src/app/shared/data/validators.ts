import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isColorValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value || value[0] !== '#') {
            return null;
        }
        const colorValid = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value);
        return !colorValid ? {valid:true}: null;
    }
}