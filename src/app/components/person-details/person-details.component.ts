import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { Defaulter } from '../../models/defaulter';
import { Comati } from '../../models/comati';
import { Payment } from '../../models/payment';
import { PaymentsHistory } from '../../models/paymentsHistory';
import { Person } from '../../models/person';
import { Member } from '../../models/member';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss'
})
export class PersonDetailsComponent implements OnInit {
comaties: Comati[] | undefined;
selectedComati: Comati | undefined;
member: Member | undefined;
members: Member[]=[];
personDetails: Person |undefined;
payments!: PaymentsHistory[];
 constructor(private commonService: CommonService){
   this.member= this.commonService.member;
  }
  async getPersonDetails(event: Member): Promise<void> {
    this.member = event;
    console.log(this.member)
  }
  async ngOnInit(): Promise<void> {
  this.comaties = this.commonService.comaties||[];
  this.selectedComati = this.commonService.selectedComati;
  this.members =await this.commonService.getMembers(this.selectedComati?.id)as Member[];
  this.payments = this.commonService.payments;
console.log(this.selectedComati)

  }

  // updateMemberDetails():void{}
  // updateSelectedComati():void{}
  // updatePersonDetails():void{}
}
