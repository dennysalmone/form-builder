import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

export interface IUser {
    email: string,
    password: string,
    userName: string
}

export interface IAuthorization {
    form: FormGroup;
    authSub: Subscription;
    onSubmit(): void;
} 

export interface IStyles {
    'color': string, 
    'width': string,
    'height': string,
    'font-weight': string,
    'font-size': string,
    'placeholder': string,
    'border-style': string
  }
