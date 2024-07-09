import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  firstValueFrom } from 'rxjs';
import { Member } from '../models/member';
import { Comati } from '../models/comati';
import { Person } from '../models/person';
import { Router } from '@angular/router';
import { Payment } from '../models/payment';
import { ComatiPost } from '../models/comatiPost';
import { Defaulter } from '../models/defaulter';
import { PaymentsHistory } from '../models/paymentsHistory';

@Injectable({
  providedIn: 'root'
})
export class CommonService {  
  
  comatiesByMgrUrl = 'https://localhost:7258/api/Comati';
  comatiUrl = 'https://localhost:7258/api/Comati/comati';
  regComatiUrl = 'https://localhost:7258/api/Comati';
  comatiMemberUrl = 'https://localhost:7258/api/ComatiMember';
  personsUrl = 'https://localhost:7258/api/Person';
  getPersonUrl = 'https://localhost:7258/api/Person/personId';
  paymentUrl = 'https://localhost:7258/api/ComatiPayment'
  amountUrl = 'https://localhost:7258/api/ComatiPayment/ComatiId'
  memberPaymentsUrl = 'https://localhost:7258/api/ComatiPayment/memberPayments'
  memberUrl = 'https://localhost:7258/api/ComatiMember/memberId'
  person: Person={name:'No User Loggedin',id:0,phone:'No Phone'};
  persons!: Person[];
  comati!: Comati;
  comaties: Comati[]=[];
  member!: Member;
  members!: Member[];
  selectedMember: any;
  maxhMemberShipId: number | undefined;
  defaulter!: Defaulter ;
  payments!: PaymentsHistory[];
  personDetails!: Person;
  selectedComati!: Comati;
  
  constructor(private http: HttpClient, private router: Router) { 
    let p = localStorage.getItem('person');
    if(p && p!=undefined){this.setUser((JSON.parse(p) as Person) );}
    this.getComaties(this.person.id);
  }
  async getComaties(MgrId: number): Promise<Comati[]> {
    const params = new HttpParams().set('MgrId', MgrId);
    this.comaties.splice(0, this.comaties.length);
    let tempArray= (await firstValueFrom(this.http.get<Comati[]>(this.comatiesByMgrUrl, { params }))).map(comati=> { return {
      ...comati,
      end_Date:new Date(Date.parse(comati.end_Date?.toString()  ??  new Date().toString())),
      start_Date:new Date(Date.parse(comati.start_Date?.toString()  ??  new Date().toString())),
    }});
    this.comaties.push(...tempArray);
    if (this.comaties.length>0){this.selectedComati= this.comaties[0]}
  return this.comaties;
  }
  async getPerson(personId: number): Promise<Person> {
    const params =new HttpParams().set('personId', personId);
    this.personDetails = await firstValueFrom(this.http.get<Person>(this.getPersonUrl, {params}));
    return this.personDetails;
   }
   async getMember(memberId: number ) {
     const params = new HttpParams().set('memberId', memberId);
     //this.personDetails= await firstValueFrom(this.http.get<Person>(this.getPerson, )) get person by memberId
     this.member = await firstValueFrom(this.http.get<Member>(this.memberUrl, {params}));
     
   }
  async getMemberPayments(comatiId: number, memberId: number): Promise<PaymentsHistory[]>  {
    const params = new HttpParams().set('comatiId', comatiId).set('memberId', memberId);
    this.payments = await firstValueFrom(this.http.get<Payment[]>(this.memberPaymentsUrl, {params})) ;
    return this.payments;
  }
  async getComati(comatiId: number) {
    const params = new HttpParams().set('comatiId', comatiId);
    this.comati = await firstValueFrom(this.http.get<Comati>(this.comatiUrl, {params}))
    return this.comati;
  }
  
  async registerMember(member: Member): Promise<Member> {
    return await firstValueFrom(this.http.post<Member>(this.comatiMemberUrl, member));
  }

  async registerComati(comati: ComatiPost): Promise<Comati> {
    return await firstValueFrom(this.http.post<any>(this.regComatiUrl, comati));
  }

  async registerPerson(person: Person): Promise<void> {
    return await firstValueFrom (this.http.post<any>(this.personsUrl, person))
  }
  async AddPayment(payment: Payment): Promise<Payment> {
    return await firstValueFrom (this.http.post<any>(this.paymentUrl, payment));
  }

  async getMembers(comatiId: number) {
    if(comatiId>0){
    const params = new HttpParams().set('comatiId', comatiId);
    this.members = await firstValueFrom(this.http.get<Member[]>(this.comatiMemberUrl, { params }));
    return this.members;
    }else {return null;}
  }

  async getPersons(): Promise<Person[]> {
    this.persons= await firstValueFrom(this.http.get<Person[]>(this.personsUrl));
    return this.persons;
  }
  async login(person:Person) {
    if (person && person.name) {
      localStorage.setItem('person', JSON.stringify(person));
      this.setUser(person);
      this.getComaties(this.person.id);
      this.router.navigateByUrl("/dash-board")
    }
  }
  rearrangeDate(date: Date): string{
var month = date.getMonth();
var year = date.getFullYear();
var day = date.getDay();
    const stringDate= (day+'/'+month+'/'+year).toString();
    return stringDate;
  console.log(stringDate);
   }
  setUser(person:Person) {
    this.person.name=person.name;
    this.person.id=person.id;
    this.person.phone=person.phone;
    this.person.remarks=person.remarks;
  }

}
