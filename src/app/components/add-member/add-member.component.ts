import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati';
import { Person } from '../../models/person';
import { Member } from '../../models/member';
import { CommonService } from '../../services/common.service';
import { GetComatiesService } from '../../services/get-comaties.service';

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
  comaties = this.getComatiesService.comaties;
  comati = this.getComatiesService.comati;
  selectedComati = this.getComatiesService.selectedComati;
  

  constructor(private commonService: CommonService,
    private getComatiesService: GetComatiesService){
    const person=this.person;
  }

member: Member = {
  name: '',
  comatiId: 0,
  personId: 0,
  memberShipId: '',
  amount: 0,
  openingDate: Date.toString(),
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
