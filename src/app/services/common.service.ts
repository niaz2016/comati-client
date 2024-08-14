import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  firstValueFrom } from 'rxjs';
import { Member } from '../models/member';
import { Comati } from '../models/comati';
import { Person } from '../models/person';
import { Router } from '@angular/router';
import { Payment } from '../models/payment';
import { Defaulter } from '../models/defaulter';
import { User } from '../models/user';
import { AllTimeDefaulter } from '../models/allTimeDefaulter';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = 'https://localhost:5000/api/';
  comatiesByMgrUrl = `${this.baseUrl}Comati`;
  comatiUrl = `${this.baseUrl}Comati/comati`;
  regComatiUrl = `${this.baseUrl}Comati`;
  comatiMemberUrl = `${this.baseUrl}ComatiMember`;
  personsUrl = `${this.baseUrl}Person`;
  personUrl = `${this.baseUrl}Person/personId`;
  paymentUrl = `${this.baseUrl}ComatiPayment`;
  memberPaymentsUrl = `${this.baseUrl}ComatiPayment/memberPayments`;
  delComatiUrl = `${this.baseUrl}Comati/delete`;
  userUrl = `${this.baseUrl}User`;
  allTimeDefaultersUrl = `${this.baseUrl}ComatiPayment/defaulters`;
  persons: Person[]=[];
  comati!: Comati;
  comaties: Comati[]=[];
  member!: Member;
  members: Member[]=[];
  selectedMember: any;
  maxhMemberShipId: number | undefined;
  defaulter!: Defaulter ;
  payments: Payment[]=[];
  personDetails!: Person;
  selectedComati!: Comati;
  user: User = {name:'No User Loggedin',id:0,phone:'', password: '', mgr: 0};
  allTimeDefaulters?: AllTimeDefaulter[];
  defaulters:Defaulter[] = [];
  constructor(private http: HttpClient, public router: Router, private cookie: CookieService) {
    
  }  
  async registerUser(user: User): Promise<User> {
    const result = await firstValueFrom(this.http.post<User>(this.userUrl, user));
    if(result) {this.user = result;}
    return result;
  }
  async getComaties(MgrId: number): Promise<Comati[]> {
    const params = new HttpParams().set('MgrId', MgrId);
    const comaties = await firstValueFrom(this.http.get<Comati[]>(this.comatiesByMgrUrl, {params}));
    console.log(this.comaties)
    return comaties;
  }
  // async getComaties(MgrId: number): Promise<Comati[]> {
  //   const params = new HttpParams().set('MgrId', MgrId);
  //   const comaties = await firstValueFrom(this.http.get<Comati[]>(this.comatiesByMgrUrl, {params}));
  //   this.comaties.push(...comaties);
  //   if(this.comaties[0]){
  //   this.selectedComati=this.comaties[0];
  //   this.defaulters=this.selectedComati.defaulters as Defaulter[];}
  //   return this.comaties;
  // }
  async getPerson(personId: number): Promise<Person> {
    const params =new HttpParams().set('id', personId);
    return await firstValueFrom(this.http.get<Person>(this.personUrl, {params}));

   }
   async getMember(memberId: number ) {
     const params = new HttpParams().set('memberId', memberId);
     //this.personDetails= await firstValueFrom(this.http.get<Person>(this.getPerson, )) get person by memberId
     this.member = await firstValueFrom(this.http.get<Member>(this.comatiMemberUrl, {params}));

   }
  async getMemberPayments(memberId: number): Promise<Payment[]>  {
    const params = new HttpParams().set('memberId', memberId);
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

  async registerComati(comati: Comati): Promise<Comati> {
    return await firstValueFrom(this.http.post<any>(this.regComatiUrl, comati));
  }

  async registerPerson(person: Person): Promise<Person> {
    return await firstValueFrom (this.http.post<any>(this.personsUrl, person));
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
    const params = new HttpParams().set('MgrId', this.user.id);
    this.persons= await firstValueFrom(this.http.get<Person[]>(this.personsUrl, { params }));
    return this.persons;
  }
  async login(MgrId:number) {
    if (MgrId>0) {
      console.log(MgrId)
      this.user.id = MgrId;
      this.user = await this.getPerson(MgrId);
      this.comaties = await this.getComaties(MgrId);
      this.selectedComati = this.comaties[0];
      if(this.selectedComati){await this.getMembers(this.selectedComati.id);}
      
      this.router.navigateByUrl("/dash-board");
    }
    else{
      this.router.navigateByUrl("/login")
      console.log("MgrId is Zero")
    }
  }
  async deleteComati(comatiId: number): Promise<number> {
    const params = new HttpParams().set('comatiId', comatiId.toString());
    const result = await firstValueFrom(this.http.delete<number>(this.delComatiUrl, { params }));
    return result;
  }
  async deletePerson(pId: number){
    const params = new HttpParams().set('id', pId);
    const result = await firstValueFrom(this.http.delete<number>(this.personsUrl, {params}));
    return result;
  }
  async deleteMember(id: number){
    const params = new HttpParams().set('id', id);
    const result = await firstValueFrom(this.http.delete<number>(this.comatiMemberUrl, {params}));
    return result
  }
  async getAllTimeDefaulters(comatiId: number){
    const params = new HttpParams().set('comatiId', comatiId)
    this.allTimeDefaulters = await firstValueFrom(this.http.get<AllTimeDefaulter[]>(this.allTimeDefaultersUrl, {params}));
    return this.allTimeDefaulters;
  }
  rearrangeDate(date: Date): string{
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDay();
    const stringDate= (day+'/'+month+'/'+year).toString();
    return stringDate;
   }
  
}
