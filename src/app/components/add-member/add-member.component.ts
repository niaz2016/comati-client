import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati';
import { DatePipeComponent } from '../../shared/date-pipe/date-pipe.component';
import { Member } from '../../models/member';
import { CommonService } from '../../services/common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons'
import { SortTablePipe } from '../../shared/sort-table.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comati-members',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipeComponent, FontAwesomeModule, SortTablePipe],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent implements OnInit {


  persons = this.commonService.persons;
  person = this.commonService.person;  
  selectedComati: Comati | undefined;
  comaties = this.commonService.comaties;
  members!: Member[];
  comati: Comati | undefined;
  constructor(private commonService: CommonService, private router: Router){
    this.person=this.commonService.person;
    
  }
  async getMembers(event: Comati) {
    this.member.comatiId= event.id;
    this.selectedComati=event;
    this.members =await this.commonService.getMembers(event.id) as Member[];
  }
  reg = true;
  edit = false;
  faEdit = faEdit;
  showTable= true;
  zeroMembers=true;

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
  this.selectedComati=this.commonService.selectedComati;
  this.members= await this.commonService.getMembers(this.selectedComati?.id??0) as Member[];
    if(this.comaties.length===0){this.showTable=false; this.zeroMembers=true;}
    if(this.members.length>0){this.showTable=true; this.zeroMembers=false;}else { this.showTable=false; }
  }
  details(){
    this.router.navigateByUrl("/person-details");
  }
  editMember(member: Member) {
    this.reg=false;
    this.edit=true;
    this.member=member;
  }
async delete(){
 const result = await this.commonService.deleteMember(this.member.id);
  if (result){window.alert("Member Deleted"+result)}
}
async register(): Promise<void> {
  this.member.comatiId=this.selectedComati?.id??0;
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
  location.reload();
}

}
