import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../models/person';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-register-person',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss'],
})
export class RegisterPersonComponent {
  person:Person = {
    id:0,
    name: '',
    phone: '',
    address: '',
    remarks: ''
  };

  constructor(private commonService: CommonService, private router: Router) { }

  async register() {
    if(this.person.name.length<3||this.person.phone.length<11){
      window.alert("Please Enter Correct Credentials")
    }
      else {
    const restult = await this.commonService.registerPerson(this.person);
    if(restult===null){
      window.alert("Person registration Failed");
    }
    else {
      window.alert("Person registration Successful");
  }
  
    
  }
}
}