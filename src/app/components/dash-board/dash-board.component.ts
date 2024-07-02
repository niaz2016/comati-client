import { Component, OnInit } from '@angular/core';
import { Comati } from '../../models/comati';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  comaties: Comati[]=[];
  
  selectedComati?: Comati | undefined;
  person!:Person;
  comati!:Comati;
  constructor(private commonService: CommonService,
  ) {
    this.person=commonService.person;
  }

  ngOnInit(): void {
    this.getComaties(this.person.id); 
  }
  updateComati(event:Comati) {
    console.log(event)
  }

  async getComaties(managerId: number): Promise<void> {
    try {
    const result = await this.commonService.getComaties(managerId);
      console.log(result);
      this.comaties = result as Comati[];
    } catch (error) {
      console.error('Error fetching comaties:', error);

    }

  }
  
}
