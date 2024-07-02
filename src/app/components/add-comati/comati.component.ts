import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comati } from '../../models/comati'
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-add-comati',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comati.component.html',
  styleUrl: './comati.component.scss'
})
export class AddComatiComponent {
  comati: Comati ={
    id: 0,
    name: '',
    per_head: 0,
    start_date: Date.toString(),
    remarks: '',
    managerId: 0,
    totalMembers: 0,
  };
  comaties: any;
  constructor(private commonService: CommonService, private router: Router){
    this.comati.managerId=commonService.person.id;
  }

  async register(){
    const result = await this.commonService.registerComati(this.comati);
    if(result?.id){
      this.router.navigateByUrl('/dash-board')
    }
    else {
      alert("result failed")
    }
  }
  async getComaties(MgrId: number): Promise<Comati[]> {
    try {
    return this.comaties = await this.commonService.getComaties(MgrId);
      console.log(this.comaties);
    } catch (error) {
      console.error('Error fetching comaties:', error);
    }
    return this.comaties;
  }
}
