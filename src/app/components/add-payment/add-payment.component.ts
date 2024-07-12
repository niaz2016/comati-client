import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comati } from '../../models/comati';
import { Person } from '../../models/person';
import { Member } from '../../models/member';
import { Payment } from '../../models/payment';
import { DatePipeComponent } from '../../shared/date-pipe/date-pipe.component';
import { Defaulter } from '../../models/defaulter';

@Component({
  selector: 'app-comati-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.scss'
})
export class AddPaymentComponent implements OnInit {
  person!:Person;
  comati!:Comati;
  comaties: Comati[]=[];
  selectedComati: Comati |undefined;
  member: Member|undefined;
  members: Member[]=[];
  selectedMember!: Member;
  defaulter: Defaulter | undefined;
  defaulters: Defaulter[]=[];
  
  constructor(private commonService: CommonService){
    this.person=this.commonService.person;
    
  }
  
payment: Payment= {
  memberId: 0,
  amount: 0,
  paymentDate: new Date(),
  remarks: ''
};
async getMembers(event: any): Promise<Member[]> {
  this.members= await this.commonService.getMembers(event.id) as Member[];
  return this.members;
}
async getAmount(event: any): Promise<void> {
  this.payment.amount=this.member?.amount as number;
  this.payment.remarks= this.member?.remarks??'';
}

async ngOnInit(){
  this.comaties=this.commonService.comaties;
  this.selectedComati=this.commonService.selectedComati;
  this.commonService.selectedComati=this.selectedComati;
}
  async payNow() {
    this.payment.memberId= this.member?.id as number;
    if (this.payment.amount==0) {
      window.alert("Payment can't be zero");
      return;
    }
    let result = await this.commonService.AddPayment(this.payment);
    if(result.memberId>0){window.alert("Payment Successfull"); return;}
    else {
      window.alert("Payment may be null")
    }
  }  

}