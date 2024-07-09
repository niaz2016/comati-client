import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  persons!: Person[];
  person!:Person;
  constructor(private commonService:CommonService) {
    
    }
    
  async ngOnInit(): Promise<void> {
    
    const persons = await this.commonService.getPersons();
    this.persons =persons;
  }
  login() {
    this.commonService.login(this.person);
    
  }

}
