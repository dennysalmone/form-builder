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
