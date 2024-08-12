import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonService } from './services/common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortTablePipe } from './shared/sort-table.pipe';
import { HamburgerComponent } from "./shared/hamburger/hamburger.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, HamburgerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HamburgerComponent]
})
export class AppComponent implements OnInit {
  user = this.commonService.user;
  title = 'comati';
  loginStatus: string = 'login'
  constructor(private commonService: CommonService, private hamburger: HamburgerComponent) {
  }
  ngOnInit(): void {
    this.loginStatus = this.commonService.user.name;
    console.log(this.commonService.user.name)
  }
  
  isMenuOpen = false;
  toggleMenu() {
    this.hamburger.onBurgerClicked()
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.hamburger.active)
  }
  
  logout() {
    this.commonService.selectedComati?.name?? '';
    this.commonService.selectedComati?.id?? 0;
    this.commonService.comaties=[];
    this.commonService.members=[];
    this.user={ id: 0, name: 'Logged Out', phone: '', mgr: 0, password: ''};
    this.commonService.selectedComati= {id: 0, name: '', managerId: 0, start_Date: new Date, per_Head: 0,totalMembers: 0, totalComati: 0, totalCollected: 0};
    this.commonService.user= this.user;
    localStorage.setItem('user', JSON.stringify(this.user));
    
    }
}