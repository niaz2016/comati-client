import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonService } from './services/common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortTablePipe } from './shared/sort-table.pipe';
import { HamburgerComponent } from "./shared/hamburger/hamburger.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Person } from './models/person';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, HamburgerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HamburgerComponent]
})
export class AppComponent implements OnInit {

  user={ id: 0, name: 'Logged Out', phone: '', mgr: 0, password: ''};
  title = 'comati';
  loginStatus: string = 'login'
  constructor(private commonService: CommonService, private hamburger: HamburgerComponent, private authService: AuthService) {
    
  }
  

  ngOnInit(): void {
    this.loginStatus = this.commonService.user.name;
  }
  
  isMenuOpen = false;
  toggleMenu() {
    this.hamburger.onBurgerClicked()
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.hamburger.active)
  }
  
  logout() {
    this.authService.logout();
    this.commonService.selectedComati?.name?? '';
    this.commonService.selectedComati?.id?? 0;
    this.commonService.comaties=[];
    this.commonService.members=[];
    this.commonService.selectedComati= {id: 0, name: '', managerId: 0, start_Date: new Date, per_Head: 0,totalMembers: 0, totalComati: 0, totalCollected: 0};
    this.commonService.user= this.user;
    
    }
}