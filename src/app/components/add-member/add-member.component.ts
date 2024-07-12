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
  comaties: Comati[] = this.commonService.comaties;
  members!: Member[];
  comati: Comati | undefined;
  constructor(private commonService: CommonService, private router: Router){
    this.person=this.commonService.person;
    
    
  }
  async getMembers(event: Comati) {
    this.member.comatiId= event.id;
    this.selectedComati=event;
    this.members =await this.commonService.getMembers(event.id) as Member[];
    console.log(event)
  }
  reg = false;
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
  if(this.comaties?.length===1){this.selectedComati=this.comaties[0];}
  this.members= await this.commonService.getMembers(this.selectedComati?.id??0) as Member[];
  this.commonService.selectedComati=this.selectedComati as Comati;
  if(this.selectedComati)
    {if(this.selectedComati?.totalMembers>0){this.showTable="show"; this.zeroMembers=''};
    if(this.selectedComati?.totalMembers===0){this.showTable=''; this.zeroMembers="show"};}
  }
  details(){
    this.router.navigateByUrl("/person-details");
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
