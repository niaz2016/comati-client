import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati'
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-add-comati',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comati.component.html',
  styleUrl: './comati.component.scss'
})
export class AddComatiComponent implements OnInit {
Comaties!: Comati[];
person!: Person;

comati: Comati ={
    id: 0,
    name: '',
    per_head: 0,
    start_date: Date.toString(),
    remarks: '',
    managerId: 0,
    totalMembers: 0,
    totalComati: 0,
  };
  comaties: any;
  constructor(private commonService: CommonService, private router: Router){
    this.comati.managerId=commonService.person.id;
    this.person=commonService.person;
  }
//registering comati
  async register(){
    const result = await this.commonService.registerComati(this.comati);
    if(result===this.comati){
      window.alert("Comati Created Successfully")
      this.router.navigateByUrl('/dash-board')
    }
    else {
      alert("result failed")
    }
  }
  async ngOnInit(): Promise<void> {
    this.comaties = await this.commonService.getComaties(this.person.id)

  }

}
