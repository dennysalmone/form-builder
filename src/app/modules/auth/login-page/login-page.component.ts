import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { IAuthorization } from '../../../shared/types and interfaces/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy, IAuthorization {

  form: FormGroup;
  authSub: Subscription;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private snackbarService: SnackbarService) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (!params['registered']) return;
      this.snackbarService.openSnackBarSucces('Now you can login', 'Ok');
    })
  }

  ngOnDestroy(): void {
    if(!this.authSub) return;
    this.authSub.unsubscribe();
  }

  onSubmit(): void {
    this.form.disable();
    this.authSub = this.auth.login({email: this.form.value.email, password: this.form.value.password, userName: 'User'}).subscribe({
      next: () => this.router.navigate(['/form/main']),
      error: (e) => {
        this.form.enable();
        this.snackbarService.openSnackBarError(e.error.message, 'Ok');
      }
    })
  }

}