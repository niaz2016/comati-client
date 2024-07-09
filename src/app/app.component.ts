import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonService } from './services/common.service';
import { Person } from './models/person';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule],
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
  person: Person | undefined;
  logout() {

    this.commonService.person={id:0,name:'No User Logged In',phone:'No phone'};
    this.person=this.commonService.person;
    localStorage.setItem('person', JSON.stringify(this.person));
    console.log("appComponent")
    }
}
