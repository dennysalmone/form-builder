import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth/auth.service";


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

    constructor (private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.auth.isAuthenticated()) return of(true);
        this.auth.logout()
        return of(false)
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(childRoute, state)
    }
}