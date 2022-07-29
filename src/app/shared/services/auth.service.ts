import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { IUser } from "src/app/shared/types and interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = ''
  constructor(private http: HttpClient, private router: Router) {

  }

  register(user: IUser): Observable<any> {
    return this.http.post<any>(`${environment.URL}register`, user)
  }

  login(user: IUser): Observable<{token: string, userName: string}> {
      return this.http.post<{token: string, userName: string}>(`${environment.URL}login`, user)
      .pipe(
          tap(
              ({token, userName}) => {
                localStorage.setItem('authToken', token);
                localStorage.setItem('userName', userName);
                this.setToken(token);
                this.setTokenFromLocalStorage();
              }
          )
      )
  }

  setToken (token: string): void {
      this.token = token;
  }

  getToken(): string {
      return this.token;
  }

  setTokenFromLocalStorage(): void {
    if (!localStorage.getItem('authToken')) return;
    this.token = (localStorage.getItem('authToken') as string);
  }

  isAuthenticated(): boolean {
      return !!this.token;
  }

  logout(): void {
      this.setToken('');
      localStorage.removeItem('authToken');
      this.router.navigate(['/auth/login']);
  }
}