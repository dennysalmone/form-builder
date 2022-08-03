import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, OnDestroy {

  userName: string;
  userSub: Subscription

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.subscribeUser();
    this.getUserName();
  }

  subscribeUser(): void {
    this.userSub = this.route.data.subscribe(data => {
      this.userName = data['userName'];
      if(this.userName){
        this.putUserNameToLocalStorage(this.userName)
      }
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  putUserNameToLocalStorage(name: string): void {
    localStorage.setItem('userName', name);
  }

  getUserName(): void {
    if(!localStorage.getItem('userName')) return;
    this.userName = localStorage.getItem('userName') as string;
  }

  logout(): void {
    this.auth.logout();
  }

}
