import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService } from "../services/auth/auth.service";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.auth.getToken()
        if(token) {
            req = req.clone({
                setHeaders: {
                    Authorization: token
                }
            })
        }
        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => this.handleAuthError(error)
            )
        )
    }

    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        if(error.status === 401) {
            this.auth.logout()
            this.router.navigate(['/auth/login']), {
                queryParams: {
                    sessionFailed: true
                }
            }
        }

        return throwError(error)
    }
}