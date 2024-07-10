import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../models/person';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { faEdit} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-register-person',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss'],
})
export class RegisterPersonComponent implements OnInit {

  person:Person = {
    id:0,
    name: '',
    phone: '',
    address: '',
    remarks: '',
  };
  faEdit = faEdit;
  edit=false;
  reg=true;
  persons: Person[]=[];
  totalCount: number = this.commonService.persons.length;
  constructor(private commonService: CommonService, private router: Router) { 
    this.ngOnInit();
  }
  async ngOnInit() {
    this.persons= await this.commonService.getPersons();
    console.log(this.persons)
    
  }

  editPersonfunc(pers: Person){
    this.person=pers;
    this.edit=true;
    this.reg=false;
    
  }
  cancelEdit() {
    this.edit = false;
    this.reg = true;
    this.person.id=0;
    this.person.name='';
    this.person.phone='';
    this.person.address='';
    this.person.remarks='';
    this.ngOnInit();
    }
  
    async savePerson(): Promise<void> {
      
      if(this.person.name.length<3||this.person.phone.length<11 || this.person.phone?.length>11){
        window.alert("Please Enter Correct Credentials");
       }
       else {const result = await this.commonService.registerPerson(this.person);
       if (result) {
        if(this.reg=true){window.alert("Person registration Successful");}
        if(this.edit=true){window.alert("Person Update Successful");}
        this.edit=false;
        this.reg=true;-
        this.cancelEdit();
       }
    }
    
  }
}