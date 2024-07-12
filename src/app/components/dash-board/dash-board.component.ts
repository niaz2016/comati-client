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
import { SortTablePipe } from '../../shared/sort-table.pipe';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FontAwesomeModule, DatePipeComponent, SortTablePipe],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit  {
  
  
  faEdit= faEdit;
  person!: Person;
  members: Member[] = [];
  comaties = this.commonService.comaties;
  
  defaulter!: Defaulter;
  defaulters: Defaulter[] = [];
  status!: string ;
  zeroComaties = true;
  showContent = true;
  defaultersTable = false;
  allPaid = false;
  selectedComati=this.commonService.selectedComati;
  
  constructor(private commonService: CommonService, private router: Router) {
    this.person=this.commonService.person;
  }
  async ngOnInit(): Promise<void> {
    this.comaties= this.commonService.comaties;
    const members = await this.commonService.getMembers(this.selectedComati?.id??0);
    this.members = members as Member[];
    this.defaulters = this.selectedComati?.defaulters as Defaulter[]; // necessary for initial settings and getData sets it after change
    if(this.comaties.length===0){this.zeroComaties=true; this.showContent=false; this.defaultersTable=false;this.allPaid=false;}else{this.zeroComaties=false; this.showContent=true;}
    if(this.defaulters.length!=0){this.defaultersTable=true;this.allPaid=false;}else{this.allPaid=true; this.defaultersTable=false;}
  }
  async getData(){
    this.members = await this.commonService.getMembers(this.selectedComati?.id?? 0) as Member[];
    this.commonService.selectedComati=this.selectedComati;
    this.defaulters = this.selectedComati?.defaulters as Defaulter[];
    if(this.defaulters.length!=0){this.defaultersTable=true;this.allPaid=false;}else{this.allPaid=true; this.defaultersTable=false}
    if(this.comaties.length===0){this.zeroComaties=true; this.showContent=false; this.defaultersTable=false;this.allPaid=false;}else{this.zeroComaties=false; this.showContent=true;}
  }

 async defaulterDetails(memberId: number) {
   await this.commonService.getMember(memberId);
     this.router.navigateByUrl("/person-details")
   }
   
}
