import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from 'src/app/modules/auth/auth-layout/auth-layout.component';
import { LoginPageComponent } from 'src/app/modules/auth/login-page/login-page.component';
import { RegisterPageComponent } from 'src/app/modules/auth/register-page/register-page.component';

const routes: Routes = [
  {
      path: "", component: AuthLayoutComponent, children: [
          { path: "login", component: LoginPageComponent },
          { path: "register", component: RegisterPageComponent },
          { path: "", redirectTo: "login", pathMatch: 'full' },
          { path: '**',redirectTo: 'login' }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}