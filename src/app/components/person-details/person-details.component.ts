import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { Defaulter } from '../../models/defaulter';
import { Comati } from '../../models/comati';
import { Payment } from '../../models/payment';
import { Person } from '../../models/person';
import { Member } from '../../models/member';
import { DatePipeComponent } from '../../shared/date-pipe/date-pipe.component';
import { SortTablePipe } from "../../shared/sort-table.pipe";

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipeComponent, SortTablePipe],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss'
})
export class PersonDetailsComponent implements OnInit {

  constructor(private commonService: CommonService){
   
   }

comaties = this.commonService.comaties;
selectedComati = this.commonService.selectedComati;
member: Member | undefined;
members = this.commonService.members;
personDetails: Person | undefined;
payments: Payment[]=[];
allPaymentsSum: number | undefined;


  async getPersonDetails(event: Member): Promise<void> {
    this.personDetails = await this.commonService.getPerson(event.personId);
    this.payments = await this.commonService.getMemberPayments(event.id);
    this.allPaymentsSum = this.payments.reduce((sum, payment) => sum + payment.amount, 0);
  }
  async comatiSelected(event: Comati) {
this.members = await this.commonService.getMembers(event.id) as Member[];
  }
  async ngOnInit(): Promise<void> {

  }
}
