import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati';
import { Person } from '../../models/person';
import { Member } from '../../models/member';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-comati-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent {
  comaties: Comati[]=[];
  persons: Person[]=[];
  
  selectedComati?: Comati | undefined;
  selectedPerson?: Person | undefined;
  amount?: number;
  person!:Person;
  comati!:Comati;
  constructor(private commonService: CommonService, private router: Router){
    this.person=commonService.person;

  }
member: Member = {
  comatiId: 0,
  personId: 0,
  amount: 0,
  remarks: '',
}

  ngOnInit(): void {
    this.getComaties(this.person.id);
    this.getPersons();
  }
  async getComaties(managerId: number): Promise<void> {
    try {
      const result = await this.commonService.getComaties(managerId);
        console.log(result);
        this.comaties = result as Comati[];
      } catch (error) {
        console.error('Error fetching comaties:', error);
  
      }
  }
  async getPersons(): Promise<void> {
    try {
      const result = await this.commonService.getPersons();
      this.persons = result;
    }
    catch (error: any) {
      console.error('Error fetching comaties:', error);
  
    }
  }
  updateComati(event:Comati) {
    console.log(event)
  }
updatePerson(event:Person){
  console.log(event)
}
async register(){
  const result = await this.commonService.registerMember(this.member);
  if(result===null){
    window.alert("Registration Failed");
  }
  else {
    window.alert("Registration was successfull");
    this.router.navigateByUrl('/add-member')
  }
}
  
}
