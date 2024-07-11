import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati';
import { DatePipeComponent } from '../../shared/date-pipe/date-pipe.component';
import { Member } from '../../models/member';
import { CommonService } from '../../services/common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-comati-members',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipeComponent, FontAwesomeModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent implements OnInit {


  persons = this.commonService.persons;
  person = this.commonService.person;  
  selectedComati: Comati =this.commonService.selectedComati;
  comaties: Comati[] = this.commonService.comaties;
  members:Member[] | undefined;
comati: Comati=this.selectedComati;
  constructor(private commonService: CommonService){
    this.person=this.commonService.person;
    if(this.selectedComati.totalMembers>0){this.showTable="show"; this.zeroMembers=''};
    if(this.selectedComati.totalMembers===0){this.showTable=''; this.zeroMembers="show"};
  }
  async getMembers(event: Comati) {
    this.member.comatiId= event.id;
    this.selectedComati=event;
    this.members =await this.commonService.getMembers(event.id) as Member[];
    console.log(event)
  }
  reg = true;
  edit = false;
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
faEdit = faEdit;
showTable: string = '';
zeroMembers: string = '';
async ngOnInit(): Promise<void> {
  this.comaties= this.commonService.comaties;
  this.members= await this.commonService.getMembers(this.selectedComati.id) as Member[];
  this.commonService.selectedComati=this.selectedComati;
  
  }
  editMember(member: Member) {
    this.reg=false;
    this.edit=true;
    this.member=member;
  }
delete(){
  this.commonService.deleteMember(this.member.id);
}
async register(): Promise<void> {
  this.member.comatiId=this.selectedComati.id;
  const result = await this.commonService.registerMember(this.member);
  
  if(result.comatiId>0){
    window.alert("Registration was successfull");
    this.close();
  }
  else {
    window.alert("Registration Failed");
  }
}
close(){
  this.reg=true;
  this.edit=false;
  this.member.id=0;
  this.member.amount=0;
  this.member.comatiId=0,
  this.member.comatiMemberNo=0;
  this.member.name='';
  this.member.remarks='';
}

}
