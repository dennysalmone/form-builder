import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isEmailValidator } from 'src/app/shared/data/validators';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';
import { IAuthorization } from '../../../shared/types and interfaces/interfaces';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy, IAuthorization {

  form: FormGroup;
  authSub: Subscription;

  constructor(private auth: AuthService, private router: Router, private snackbarService: SnackbarService) {

  }

  ngOnDestroy(): void {
    if (!this.authSub) return;
    this.authSub.unsubscribe();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, isEmailValidator()]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    this.form.disable();
    this.authSub = this.auth.register(this.form.value).subscribe({
      next: (v) => this.router.navigate(['/auth/login'], {
        queryParams: {
          registered: true
        }
      }),
      error: (e) => {
        this.form.enable();
        this.snackbarService.openSnackBarError(e.error.message, 'Ok');
      }
    })
  }

}
