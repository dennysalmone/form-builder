import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(
    private auth: AuthService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.tokenInStorageCheck();
  }

  tokenInStorageCheck(): void {
    if (!this.auth.isAuthenticated()) return;       
    this.router.navigate(['/form']);
  }

}
