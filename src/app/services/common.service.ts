import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Member } from '../models/member';
import { Comati } from '../models/comati';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  private comatiesByMgr = 'https://localhost:7258/api/Comati';
  private registerMemberUrl = 'https://localhost:7258/api/ComatiMember';
  private personUrl = 'https://localhost:7258/api/Person';
  private paymentUrl = 'https://localhost:7258/api/Payment'

  person!: Person;
  persons!:Person[];
  router: any;

  
  constructor(private http: HttpClient) { 
    let p = sessionStorage.getItem('person');
    if (p && p!="undefined") {
      this.person = (JSON.parse(p?? JSON.stringify(undefined)) as Person) ;
    } 
    else {
      this.person={name:'No User Looged In',id:0};
    }
  }

  async registerMember(member: Member): Promise<any> {
    return await firstValueFrom(this.http.post<any>(this.registerMemberUrl, member));
  }

  async registerComati(comati: Comati): Promise<any> {
    return await firstValueFrom(this.http.post<any>(this.comatiesByMgr, comati));
  }

  async registerPerson(person: Person): Promise<any> {
    return await firstValueFrom (this.http.post<any>(this.personUrl, person))
  }

  async getComaties(MgrId: number): Promise<any> {
    const params = new HttpParams().set('MgrId', MgrId);
    return await firstValueFrom(this.http.get<any>(`${this.comatiesByMgr}/byManagerId`, { params }));
  }

  async getPersons(): Promise<any> {
    this.persons= await firstValueFrom (this.http.get<Person[]>(this.personUrl))
    return this.persons;
  }
  
  async login(person:Person) {
    this.person=person;
    sessionStorage.setItem('person', JSON.stringify(this.person));
    this.router.navigateByUrl("/dash-board")
  }
}
