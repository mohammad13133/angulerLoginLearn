import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
interface DecodedToken {
  username: string;
  exp?: number;
  role: string;
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  currentUser: DecodedToken | null = null;
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.currentUser = this.loginService.getCurruntUser();
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}
