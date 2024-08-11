import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person';
import { CommonService } from '../../services/common.service';
import { Comati } from '../../models/comati';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Member } from '../../models/member';
import { DatePipeComponent } from '../../shared/date-pipe/date-pipe.component';
import { SortTablePipe } from '../../shared/sort-table.pipe';
import { TableComponent } from '../../shared/table/table.component';
import { Defaulter } from '../../models/defaulter';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, DatePipeComponent, SortTablePipe, TableComponent],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  faEdit = faEdit;
  person!: Person;
  members?: Member[];
  comaties!: Comati[];
  defaulter!: Defaulter;
  defaulters?: Defaulter[];
  selectedComati?: Comati;
  status!: string;
  zeroComaties = true;
  zeroMembers = false;
  defaultersTable = false;
  allPaid = false;
  totalShort!: number;
  empty = false;
  showAlltimeDefs = false;
  comatiesAvailable = false;
  allTimeDefaulters = this.commonService.allTimeDefaulters;
  constructor(private commonService: CommonService) {
    this.person = this.commonService.person;
    
  }

  async ngOnInit(): Promise<void> {
    await this.commonService.getComaties(this.person.id);
    this.comaties = this.commonService.comaties;
    this.selectedComati=this.commonService.selectedComati;
    await this.commonService.getMembers(this.selectedComati.id)
    this.members=this.commonService.members;
    this.selectedComati = this.commonService.selectedComati;
    this.defaulters = this.selectedComati.defaulters;
    if(this.comaties[0]){this.comatiesAvailable=true;}
    this.selectedComati = this.commonService.selectedComati;
    // Fetch members from the service
    if(this.comaties.length>0){ await this.getData();}else{this.empty=true;}
  }
  defaultersData(){
    return this.commonService.defaulters;
  }
  membersCount(){
    const members = this.members?.length
    return(members+" members in "+this.selectedComati?.name).toString();
  }
  navigate(){
    this.commonService.router.navigateByUrl('/add-comati')
  }
  async getAllTimeDefaulters(){
   this.allTimeDefaulters = await this.commonService.getAllTimeDefaulters(this.commonService.selectedComati.id)
    if(this.commonService.allTimeDefaulters.length>0){this.showAlltimeDefs = true; return this.commonService.allTimeDefaulters; }
    else this.showAlltimeDefs = false; return window.alert("No defaulters found")
  }
  async getData() {
    try {
      const members = await this.commonService.getMembers(this.selectedComati?.id??0) as Member[];
      this.members = [...members]; // Update array to trigger change detection
      this.commonService.defaulters = this.selectedComati?.defaulters || [];
      this.defaultersTable = this.commonService.defaulters.length > 0;
      this.allPaid = this.commonService.defaulters.length === 0;
      this.zeroMembers = this.members.length === 0;
      this.zeroComaties = this.comaties.length === 0;
      this.commonService.selectedComati = this.selectedComati as Comati;
    } 
  }
  
  async defaulterDetails(memberId: number) {
    await this.commonService.getMember(memberId);
    this.commonService.router.navigateByUrl("/person-details")
  }
}
