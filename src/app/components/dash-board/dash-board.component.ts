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
import { TableComponent } from '../../shared/table/table.component';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FontAwesomeModule, DatePipeComponent, SortTablePipe, TableComponent],
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
  status!: string;
  zeroComaties = true;
  zeroMembers = false;
  defaultersTable = false;
  allPaid = false;
  selectedComati?: Comati;

  constructor(private commonService: CommonService, private router: Router) {
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
  }
  getMembers() {
    return this.members;
  }
  membersCount(){
    const members = this.members?.length
    return(members+" members in "+this.selectedComati?.name).toString();
  }
  async getData() {
    try {
      const members = await this.commonService.getMembers(this.selectedComati?.id?? 0) as Member[];
      this.members = [...members]; // Update array to trigger change detection
      this.defaulters = this.selectedComati?.defaulters || [];
      this.defaultersTable = this.defaulters.length > 0;
      this.allPaid = this.defaulters.length === 0;
      this.zeroMembers = this.members.length === 0;
      this.zeroComaties = this.comaties.length === 0;
      this.commonService.selectedComati = this.selectedComati as Comati;
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  

  async defaulterDetails(memberId: number) {
    await this.commonService.getMember(memberId);
    this.router.navigateByUrl("/person-details")
  }
}
