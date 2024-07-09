import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati';
import { DatePipeComponent } from '../../shared/date-pipe/date-pipe.component';
import { Member } from '../../models/member';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-comati-members',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipeComponent],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent implements OnInit {

  persons = this.commonService.persons;
  person = this.commonService.person;  
  selectedComati: Comati =this.commonService.selectedComati;
  comaties: Comati[] = this.commonService.comaties;
  members:Member[] | undefined;
  constructor(private commonService: CommonService){
    this.person=this.commonService.person;
  }
  async getMembers(event: Comati) {
    this.member.comatiId= event.id;
    this.selectedComati=event;
    this.members =await this.commonService.getMembers(event.id) as Member[];
    console.log(event)
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
  this.comaties= this.commonService.comaties;
  this.selectedComati=this.commonService.selectedComati;
  this.members= await this.commonService.getMembers(this.selectedComati.id) as Member[];
  this.commonService.selectedComati=this.selectedComati;
  console.log(this.members)
  }

async register(): Promise<void> {
  const result = await this.commonService.registerMember(this.member);
  
  if(result.comatiId>0){
    window.alert("Registration was successfull");
  }
  else {
    window.alert("Registration Failed");
  }
}
  
}
