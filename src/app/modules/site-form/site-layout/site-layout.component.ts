import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent {

  userName: string = this.checkLocalStorageUserName();

  constructor(private auth: AuthService) { }

  logout(): void {
    this.auth.logout();
  }

  checkLocalStorageUserName(): string {
    const user = localStorage.getItem('userName');
    if (!user) return 'User';
    return user;
  }

}
