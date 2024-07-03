import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Member } from '../models/member';
import { Comati } from '../models/comati';
import { Person } from '../models/person';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  comatiesByMgrUrl = 'https://localhost:7258/api/Comati';
  regComatiUrl = 'https://localhost:7258/api/Comati';
  comatiMemberUrl = 'https://localhost:7258/api/ComatiMember';
  GetpersonUrl = 'https://localhost:7258/api/Person';
  paymentUrl = 'https://localhost:7258/api/ComatiPayment'
  mmidUrl = 'https://localhost:7258/api/ComatiMember/mmid'
  person!: Person;
  persons!: Person[];
  comati!: Comati;
  comaties!: Comati[];
  member!: Member;
  members!: Member[];
  selectedMember: any;
  maxhMemberShipId: number | undefined;

  
  constructor(private http: HttpClient, private router: Router) { 
    let p = sessionStorage.getItem('person');
    if (p && p!="undefined") {
      this.person = (JSON.parse(p?? JSON.stringify(undefined)) as Person) ;
    } 
    else {
      this.person={name:'No User Looged In',id:0};
    }
  }

  async registerMember(member: Member): Promise<Member> {
    return await firstValueFrom(this.http.post<Member>(this.comatiMemberUrl, member));
  }

  async registerComati(comati: Comati): Promise<any> {
    return await firstValueFrom(this.http.post<any>(this.regComatiUrl, comati));
  }

  async registerPerson(person: Person): Promise<any> {
    return await firstValueFrom (this.http.post<any>(this.GetpersonUrl, person))
  }
  async AddPayment(comatiId: number, memberId: number) {
    throw new Error('Method not implemented.');
  }
  //get maxhMimberShipId
  async getMemberShipId(comatiId: number) {
    const params = new HttpParams().set('comatiId', comatiId.toString());
    this.maxhMemberShipId = await firstValueFrom(this.http.get<number>(this.mmidUrl, { params }));
    return this.maxhMemberShipId+1;
  }

  async getMembers(comatiId: number) {
    const params = new HttpParams().set('comatiId', comatiId);
    this.members = await firstValueFrom(this.http.get<Member[]>(this.comatiMemberUrl, { params }));
    return this.members;
  }
  async getComaties(MgrId: number): Promise<Comati[]> {
    const params = new HttpParams().set('MgrId', MgrId);
    this.comaties = await firstValueFrom(this.http.get<Comati[]>(this.comatiesByMgrUrl, { params }));
    return this.comaties;
  }

  async getPersons(): Promise<Person[]> {
    this.persons= await firstValueFrom (this.http.get<Person[]>(this.GetpersonUrl))
    return this.persons;
  }

  async login(person:Person) {
    this.person=person;
    sessionStorage.setItem('person', JSON.stringify(this.person));
    this.router.navigateByUrl("/dash-board")
    
  }
}
