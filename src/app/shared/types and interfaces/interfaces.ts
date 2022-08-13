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
    color: string, 
    width: string,
    height: string,
    fontWeight: string,
    fontSize: string,
    placeholder: string,
    borderStyle: string
}

export interface ITokenUser {
    token: string,
    userName: string
}
