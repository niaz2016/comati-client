import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati'
import { CommonService } from '../../services/common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { PopupComponent } from '../../shared/popup/popup.component';

@Component({
  selector: 'app-add-comati',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './comati.component.html',
  styleUrl: './comati.component.scss'
})
export class AddComatiComponent implements OnInit {
del(arg0: number) {
throw new Error('Method not implemented.');
}
popupContainer!: ViewContainerRef;
faEdit=faEdit;
person=this.commonService.person;
comaties: Comati[] | undefined;
comati: Comati = {
  id: 0,
  managerId: 0,
  name: '',
  start_Date: new Date(),
  per_Head: 0,
  remarks: '',
  totalMembers: 0,
  totalComati: 0,
  totalCollected: 0
};
zeroComaties: boolean = false;
showTable = false;
reg: boolean = true;
edit: boolean = false;
constructor(private commonService: CommonService){
  this.comati.managerId=this.person.id;
}
  async ngOnInit(): Promise<void> {
    this.comaties = this.commonService.comaties;
    if(this.comaties?.length===0){this.zeroComaties=true; this.showTable=false}
    if(this.comaties?.length!=0){this.zeroComaties=false; this.showTable=true;}
  }
editComati(comati: Comati){
  this.comati=comati;
  this.reg=false;
  this.edit=true;
}
async close(){
  this.reg=true; this.edit=false;
  this.comati.name='';
  this.comati.per_Head=0;
  this.comati.remarks='';
  this.comaties=await this.commonService.getComaties(this.person.id);
}
// openPopup(comati: Comati){
//   this.popupService.popupRef = this.popupContainer.createComponent(PopupComponent);
//   this.popupService.openPopup(comati);
// }
//registering comati
  async register(comati: Comati){
    this.comati=comati;
    if ((this.comati.per_Head)===0 || (this.comati.name.length)<3 || this.comati.managerId===0 ){
      window.alert("Please Provide correct Credentials")
    }else{
    const result =  this.commonService.registerComati(this.comati);
    if((await result).managerId===this.person.id){
      if(this.reg){window.alert("Comati Created Successfully");}
      if(this.edit){window.alert("Comati Updated Successfully");}
      this.close();
    }
    else {
      alert("result failed")
    }
  } 
  }
}