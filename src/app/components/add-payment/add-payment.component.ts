import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetComatiesService } from '../../services/get-comaties.service';
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
  comaties: Comati[] | undefined;
  comati!:Comati;
  selectedMember!:Member
  members!: Member[];
  member!: Member;
  memberAmount: number=0;
  remarks: string | undefined;
  selectedComati: Comati | undefined;
  constructor(private commonService: CommonService, private getComatiesService: GetComatiesService){
    this.person=this.commonService.person;
  }
payment: Payment = {
  comatiId: 0,
  memberShipId: 0,
}
async getMembers(event: any): Promise<void> {
  this.members= await this.commonService.getMembers(event.id);
  
}
async getAmount(event: any) {
 this. memberAmount =await this.member?.amount;
 this.remarks = await this.member?.remarks;
}
async ngOnInit(): Promise<Comati[]> {
  this.comaties = await this.commonService.getComaties(this.person.id);
  return this.comaties;
}
  updateComati(event:Comati) {}
  updatePerson(event:Person){}
  updateMember(event:Member){}

  payNow() {
    this.payment.comatiId=this.member.comatiId;
    this.commonService.AddPayment( this.payment.comatiId, this.payment.memberShipId)
  }  

}