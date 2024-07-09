import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati'
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { Person } from '../../models/person';
import { ComatiPost } from '../../models/comatiPost';

@Component({
  selector: 'app-add-comati',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comati.component.html',
  styleUrl: './comati.component.scss'
})
export class AddComatiComponent implements OnInit {
  
comaties!: Comati[];
person!: Person;
comati: ComatiPost ={
    managerId: 0,
    name: '',
    start_Date: new Date(),
    per_Head: 0,
    remarks: '',
  };
constructor(private commonService: CommonService, private router: Router){

  this.person=commonService.person;
  this.comati.managerId=this.person.id;
}
//registering comati
  async register(){
    if ((this.comati.per_Head)===0 || await(this.comati.name.length)<3 || this.comati.managerId===0 ){
      window.alert("Please Provide correct Credentials")
    }else{
    const result =  this.commonService.registerComati(this.comati);
    if((await result).managerId===this.person.id){
      window.alert("Comati Created Successfully")
      this.router.navigateByUrl('/dash-board')
    }
    else {
      alert("result failed")
    }

  } location.reload();
  }
  async ngOnInit(): Promise<void> {
    this.comaties=this.commonService.comaties;
    
  }

}
