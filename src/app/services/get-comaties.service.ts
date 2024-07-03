import { Injectable, OnInit } from '@angular/core';
import { Comati } from '../models/comati';
import { Person } from '../models/person';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class GetComatiesService  {

selectedComati?: Comati | undefined;
person!:Person;
comati: Comati = {
  id: 0,
  name: '',
  start_date: '',
  per_head: 0,
  end_date: '',
  remarks: '',
  managerId: 0,
  totalMembers: 0,
  totalComati: 0,
}
comaties:Comati[] | undefined;
  constructor(private commonService: CommonService,
  ) {
    this.person=commonService.person;
  }
  
  
  updateComati(event:Comati) {
    console.log(event)
  }
}
