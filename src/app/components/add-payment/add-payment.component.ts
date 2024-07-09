import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comati } from '../../models/comati';
import { Person } from '../../models/person';
import { Member } from '../../models/member';
import { Payment } from '../../models/payment';

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
  comaties!: Comati[];
  selectedComati!: Comati ;
  member!: Member;
  members!: Member[];
  selectedMember!: Member;
  memberAmount!: number;
  memberRemarks!: string;
  
  constructor(private commonService: CommonService){
    this.person=this.commonService.person;
    this.comaties =  this.commonService.comaties;
  }
  
payment: Payment= {
  comatiId: 0,
  memberId: 0,
  amount: 0,
  paymentDate: new Date(),
  remarks: ''
};
async getMembers(event: any): Promise<Member[]> {
  this.members= await this.commonService.getMembers(event.id);
  return this.members;
}
async getAmount(event: any): Promise<void> {
  this.memberAmount=this.member.amount;
  this.memberRemarks= this.member.remarks;
  
}

async ngOnInit(){
  
}
  async payNow() {
    this.payment.comatiId= this.comati.id;
    this.payment.memberId= this.member.id;
    this.payment.amount=this.memberAmount;
    this.payment.remarks=this.memberRemarks;
    if (this.payment.amount==0) {
      window.alert("Payment can't be zero");
      return;
    }
    let result = await this.commonService.AddPayment(this.payment);
    if(result.comatiId){window.alert("Payment Successfull"); return;}
    
    else if (this.payment!==null) {
    
    }
    else {
      window.alert("Payment may be null")
    }
  }  

}