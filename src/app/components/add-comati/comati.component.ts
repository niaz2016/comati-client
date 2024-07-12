import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati'
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';

@Component({
  selector: 'app-add-comati',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './comati.component.html',
  styleUrl: './comati.component.scss'
})
export class AddComatiComponent implements OnInit {
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
constructor(private commonService: CommonService, private router: Router){
  this.comati.managerId=this.person.id;
  this.ngOnInit();
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
close(){
  this.reg=true; this.edit=false;
  this.comati.name='';
  this.comati.per_Head=0;
  this.comati.remarks='';
  location.reload();
}
async del(comatiId: number){
  this.commonService.deleteComati(comatiId);
  this.close();
  location.reload();
}
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