import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati';
import { Person } from '../../models/person';
import { Member } from '../../models/member';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-comati-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent {
  persons = this.commonService.persons;
  person = this.commonService.person;  
selectedComati: Comati | undefined;
comaties: Comati[]=[];
  constructor(private commonService: CommonService){
    const person=this.person;
  }

member: Member = {
  id: 0,
  name: '',
  comatiId: 0,
  personId: 0,
  comatiMemberNo: 0,
  amount: 0,
  openingMonth: new Date(),
  remarks: '',
}

async ngOnInit(): Promise<void> {
    
  this.commonService.getComaties(this.person.id)
      .then(comaties => {
        this.comaties = comaties;
      })
      .catch(error => {
        console.error('Error fetching comaties', error);
      });
  this.persons= await  this.commonService.getPersons();
  }
updateComati(event:Comati) {}
updatePerson(event:Person){}


//registering a person to a comati making it Member
async register(): Promise<void> {
  //await this.commonService.getMemberShipId(this.getComatiesService.selectedComati?.id?? 1)).toString;
  const result = await this.commonService.registerMember(this.member);
  this.selectedComati=undefined;
  
  if(result.comatiId!==0){
    window.alert("Registration was successfull");
  }
  else {
    window.alert("Registration Failed");
  }
}
  
}
