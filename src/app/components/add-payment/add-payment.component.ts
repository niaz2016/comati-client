import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comati } from '../../models/comati';
import { Person } from '../../models/person';
import { Member } from '../../models/member';
import { Payment } from '../../models/payment';
import { Defaulter } from '../../models/defaulter';
import { TableComponent } from "../../shared/table/table.component";
import { AllTimeDefaulter } from '../../models/allTimeDefaulter';

@Component({
  selector: 'app-comati-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.scss'
})
export class AddPaymentComponent implements OnInit {
  person!:Person;
  comati!:Comati;
  comaties: Comati[]=[];
  selectedComati?: Comati;
  member: Member|undefined;
  members: Member[]=[];
  selectedMember!: Member;
  defaulter: Defaulter | undefined;
  defaulters: Defaulter[]=[];
  allTimeDefaulters?: AllTimeDefaulter[];
  totalShort: number | undefined;
  constructor(private commonService: CommonService){
    this.person=this.commonService.person;

  }

payment: Payment= {
  comatiId: 0,
  memberId: 0,
  amount: 0,
  paymentDate: new Date(),
  remarks: ''
};
async getMembers(event: Comati): Promise<Member[]> {
  this.members= await this.commonService.getMembers(event.id) as Member[];
  return this.members;
}
async getAmount(event: any): Promise<void> {
  this.payment.amount=this.member?.amount as number;
  this.payment.remarks= this.member?.remarks??'';
}
async getAllTimeDefaulters(){
  if(this.selectedComati){this.allTimeDefaulters =await this.commonService.getAllTimeDefaulters(this.selectedComati.id);
  this.totalShort= this.allTimeDefaulters.reduce((sum, AllTimeDefaulters) => sum + AllTimeDefaulters.amountOverdue, 0);
  if(this.allTimeDefaulters.length===0){window.alert("No any Overdue Payment")}
  }
}
details(){
  this.commonService.router.navigateByUrl("/person-details");
}
selComati(event: Comati){
  this.selectedComati = event;
}
async ngOnInit(){
  this.comaties=this.commonService.comaties;

}
  async payNow() {
    this.payment.comatiId=this.selectedComati?.id as number;
    this.payment.memberId= this.member?.id as number;
    if (this.payment.amount==0) {
      window.alert("Payment can't be zero");
      return;
    }
    else{
      try {
        let result = await this.commonService.AddPayment(this.payment);
    if(result){window.alert("Payment Successfull"); return;}
    else {
      window.alert("Payment may be null")
      }
    }
    catch(err: any){window.alert("Error: "+err.error)} 

  }
  }

}
