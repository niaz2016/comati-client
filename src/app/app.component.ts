import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonService } from './services/common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HamburgerComponent } from "./shared/hamburger/hamburger.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, HamburgerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HamburgerComponent]
})
export class AppComponent implements OnInit {

  //user={ id: 0, name: 'Logged Out', phone: '', mgr: 0, password: ''};
  title = 'Comati';
  loginStatus: string = 'login'
  userCookie?: string;
  constructor(
    private commonService: CommonService,
    private hamburger: HamburgerComponent,
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router,
  ) {
    this.userCookie = this.cookie.get("User");
    if (this.userCookie) {
        try {
          this.authService.login();
          const user = JSON.parse(this.userCookie);
          // this.user.id = user.Id;
          // this.user.name = user.Name,
          // this.user.mgr = user.Mgr,
          // this.user.phone = user.Phone,
          // this.user.password = user.Password
          // this.loginStatus = user.Name;
          commonService.login(user.Id);
        } catch (e) {
            console.error("Error parsing user JSON:", e);
        }
    } else {
      this.router.navigateByUrl("/login");
      return;
    }

  }

  
  ngOnInit(): void {
     
  }
  
  isMenuOpen = false;
  toggleMenu() {
    this.hamburger.onBurgerClicked()
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  logout() {
    this.authService.logout();
    }
}