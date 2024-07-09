import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person';
import { CommonService } from '../../services/common.service';
import { Defaulter } from '../../models/defaulter';
import { Router, RouterLink } from '@angular/router';
import { Comati } from '../../models/comati';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Member } from '../../models/member';
import { DatePipeComponent } from '../../shared/date-pipe/date-pipe.component';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FontAwesomeModule, DatePipeComponent],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit  {
  constructor(private commonService: CommonService, private router: Router) {
    this.person=this.commonService.person;
    
  }

  faEdit= faEdit;
  person!: Person;
  members: Member[] = [];
  comaties: Comati[]=[];
  defaulter!: Defaulter;
  defaulters: Defaulter[] = [];
  status!: string ;
  startDate!: string;
  endDate!: string;
  selectedComati!: Comati;
  async ngOnInit(): Promise<void> {
    this.comaties= await this.commonService.getComaties(this.person.id);
    this.selectedComati=this.comaties[0];
    this.defaulters = this.selectedComati?.defaulters||[];
    this.members = await this.commonService.getMembers(this.selectedComati?.id)
    this.startDate = this.commonService.rearrangeDate(this.selectedComati?.start_Date?? new Date());
    this.endDate = this.commonService.rearrangeDate(this.selectedComati?.end_Date?? new Date());
  }
  async getData(){
    this.defaulters = this.selectedComati?.defaulters||[];
    this.commonService.selectedComati = this.selectedComati as Comati;
    
    this.members = await this.commonService.getMembers(this.selectedComati?.id?? 0)
  }

 async defaulterDetails(memberId: number) {
   await this.commonService.getMember(memberId);
     this.router.navigateByUrl("/person-details")
   }
   
}
