import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private isLoggedIn: boolean = false;

  constructor() { }
  canActivate(): boolean {
    return this.checkLoggedIn();
  }

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  checkLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
