import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isColorValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value || value[0] !== '#') {
            return null;
        }
        const colorValid = /^#([A-Fa-f0-9]{3,8})$/.test(value);
        return !colorValid ? {valid:true}: null;
    }
}

export function isEmailValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value || value.length < 7) {
            return null;
        }
        const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        return !emailValid ? {valid:true}: null;
    }
}