import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { AllTimeDefaulter } from '../../models/allTimeDefaulter';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule,RouterLink, DatePipeComponent, SortTablePipe, TableComponent],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  faEdit = faEdit;
  user?: Person;
  members?: Member[];
  comaties?: Comati[];
  defaulter!: Defaulter;
  defaulters!: Defaulter[];
  selectedComati!: Comati;
  status!: string;
  zeroComaties = true;
  zeroMembers = false;
  defaultersTable = false;
  allPaid = false;
  totalShort!: number;
  empty = true;
  showAlltimeDefs = false;
  comatiesAvailable = false;
  allTimeDefaulters!: AllTimeDefaulter[];
  constructor(private commonService: CommonService, private cookie: CookieService, private auth: AuthService) {
    
  }
  async ngOnInit(): Promise<void> {
    const string = this.cookie.get('User');
    if(string) {const obj = JSON.parse(string);
    if(obj){
    this.auth.login();
    await this.commonService.login(obj.Id)}}
    this.comaties=this.commonService.comaties;
    if(this.comaties[0])
      {
        this.selectedComati= this.comaties[0];
        this.allTimeDefaulters = await this.commonService.getAllTimeDefaulters(this.selectedComati.id);
        await this.commonService.getMembers(this.selectedComati.id);
        this.defaulters = this.selectedComati.defaulters as Defaulter[];
        this.members = await this.commonService.getMembers(this.selectedComati.id) as Member[];
        this.commonService.selectedComati= this.selectedComati;
        this.comatiesAvailable=true;
        this.empty = false;
      }
    // Fetch members from the service
    if(this.comaties.length>0){ await this.getData(this.selectedComati);}else{this.empty=true;}
  }
  async defaultersData(){
    return this.selectedComati.defaulters as Defaulter[];
  }
  membersCount(){
    const members = this.members?.length
    return(members+" members in "+this.selectedComati?.name).toString();
  }
  navigate(){
    this.commonService.router.navigateByUrl('/add-comati')
  }
  async getAllTimeDefaulters(){
   this.allTimeDefaulters = await this.commonService.getAllTimeDefaulters(this.selectedComati?.id??this.commonService.selectedComati.id)
   this.allTimeDefaulters = this.commonService.allTimeDefaulters = this.allTimeDefaulters;
  }
  async getData(comati: Comati) {
    try {
      const members = await this.commonService.getMembers(comati.id) as Member[];
      this.defaulters = this.selectedComati.defaulters as Defaulter[];
      this.members = [...members]; // Update array to trigger change detection
      this.commonService.defaulters = this.defaulters as Defaulter[];
      this.defaultersTable = this.commonService.defaulters.length > 0;
      this.allPaid = this.commonService.defaulters.length === 0;
      this.zeroMembers = this.members.length === 0;
      this.zeroComaties = this.comaties?.length === 0;
      this.commonService.selectedComati = this.selectedComati as Comati;
    } 
    catch(err: any){
        console.log(err)
    }
  }
  async defaulterDetails(memberId: number) {
    await this.commonService.getMember(memberId);
    this.commonService.router.navigateByUrl("/person-details")
  }
}
