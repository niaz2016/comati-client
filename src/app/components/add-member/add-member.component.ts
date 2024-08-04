import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati';
import { DatePipeComponent } from '../../shared/date-pipe/date-pipe.component';
import { Member } from '../../models/member';
import { CommonService } from '../../services/common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons'
import { SortTablePipe } from '../../shared/sort-table.pipe';
import { PopupComponent } from '../../shared/popup/popup.component';
import { TableComponent } from "../../shared/table/table.component";

@Component({
  selector: 'app-comati-members',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipeComponent, FontAwesomeModule, SortTablePipe, TableComponent],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent implements OnInit {

  persons = this.commonService.persons;
  person = this.commonService.person;  
  selectedComati= this.commonService.selectedComati;
  comaties = this.commonService.comaties;
  members= this.commonService.members;
  comati: Comati | undefined;
  constructor(private commonService: CommonService,
    ){  }
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
  amount: 0,
  openingMonth: new Date(),
  remarks: '',
}
async ngOnInit(): Promise<void> {
  this.members= await this.commonService.getMembers(this.selectedComati.id) as Member[];
    if(this.comaties.length===0){this.showTable=false; this.zeroMembers=true;}
    if(this.members.length>0){this.showTable=true; this.zeroMembers=false;}else { this.showTable=false; }
  }
  details(){
    this.commonService.router.navigateByUrl("/person-details");
  }
  editMember(member: Member) {
    this.reg=false;
    this.edit=true;
    this.member=member;
  }
  @ViewChild('popupContainer', { read: ViewContainerRef, static: true })
  popupContainer!: ViewContainerRef;
  popupRef?: ComponentRef<PopupComponent> ;
  message: string = 'Are you sure to delete';
openPopup(member: Member){
  if (this.popupRef) {
    return; // Popup is already open
  }
  this.popupRef = this.popupContainer.createComponent(PopupComponent);
  this.popupRef.instance.title = member.name; 
  this.popupRef.instance.message = this.message;
  this.popupRef.instance.del = () => {this.commonService.deleteMember(member.id); this.closePopup()};
  this.popupRef.instance.close = () => this.closePopup();
}
closePopup() {
  this.popupRef?.destroy();
  this.close();
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
  this.member.name='';
  this.member.remarks='';
 this.ngOnInit();
}

}
