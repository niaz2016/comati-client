import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonService } from './services/common.service';
import { Person } from './models/person';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortTablePipe } from './shared/sort-table.pipe';
import { HamburgerComponent } from "./shared/hamburger/hamburger.component";
import { CommonModule } from '@angular/common';
import "@fontsource/roboto"; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, SortTablePipe, HamburgerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[]
})
export class AppComponent implements OnInit {
  
  title = 'comati';
  constructor(private commonService: CommonService) {
  }
  ngOnInit(): void {
    this.person=this.commonService.person;
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  person: Person| undefined;
  logout() {
    this.commonService.selectedComati?.name?? '';
    this.commonService.selectedComati?.id?? 0;
    this.commonService.comaties=[];
    this.commonService.members=[];
    this.person={ id: 0, name: '', phone: ''};
    this.commonService.selectedComati= {id: 0, name: '', managerId: 0, start_Date: new Date, per_Head: 0,totalMembers: 0, totalComati: 0, totalCollected: 0};
    localStorage.setItem('person', JSON.stringify(this.person));
    }
}