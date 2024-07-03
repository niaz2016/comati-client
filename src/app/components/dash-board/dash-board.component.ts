import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetComatiesService } from '../../services/get-comaties.service';
import { Comati } from '../../models/comati';
import { Person } from '../../models/person';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit  {

  selectedComati: Comati |undefined
  person!: Person;
  comati!: Comati;
  comaties!: Comati[];
  constructor(private getComatiesService: GetComatiesService, private commonService: CommonService) { 
    this.person = commonService.person;
   }

  async ngOnInit(): Promise<void> {
    this.comaties = await this.commonService.getComaties(this.person.id);
  }
updateComati(event:Comati) {}
updatePerson(event:Person){}

}
  
