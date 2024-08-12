import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../models/person';
import { CommonService } from '../../services/common.service';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopupComponent } from '../../shared/popup/popup.component';
import { TableComponent } from "../../shared/table/table.component";
@Component({
  selector: 'app-register-person',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, TableComponent],
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss'],
})
export class RegisterPersonComponent implements OnInit {
  person:Person = { //edit old Person
    id: 0,
    name: '',
    phone: '',
    address: '',
    remarks: '',
    mgr: 0,
  };
  regPerson: Person = { //register new Person
    id: 0,
    name: '',
    phone: '',
    address: '',
    remarks: '',
    mgr: 0,
  };
  faEdit = faEdit;
  edit=false;
  reg=false;
  persons = this.commonService.persons;
  filteredPersons = this.persons;
  searchQuery: string = '';
  totalCount: number = this.commonService.persons.length;
  constructor(private commonService: CommonService){  }

  filterPersons() {
    if (this.searchQuery) {
      this.filteredPersons = this.persons.filter(person =>
        Object.values(person).some(value =>
          value !== null && value !== undefined && value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    } else {
      this.filteredPersons = [...this.persons];  // If no search query, show all persons
    }
  }
  
  
  async ngOnInit() {
    this.persons = await this.commonService.getPersons();
  }
  openReg(){
    this.reg = true;
    this.edit = false;
  }
  regPer(){
   this.savePerson(this.regPerson);
  }
  editPer(){
    this.savePerson(this.person);
  }

  @ViewChild('popupContainer', { read: ViewContainerRef, static: true })
  popupContainer!: ViewContainerRef;
  popupRef?: ComponentRef<PopupComponent> ;
  message: string = 'Are you sure to delete';
openPopup(person: Person){
  if (this.popupRef) {
    return; // Popup is already open
  }
  this.popupRef = this.popupContainer.createComponent(PopupComponent);
  this.popupRef.instance.title = person.name; 
  this.popupRef.instance.message = this.message;
  this.popupRef.instance.del = () => this.del(person.id);
  this.popupRef.instance.close = () => this.closePopup();
}
closePopup() {
  this.popupRef?.destroy();
  
}
async del(id: number){
  await this.commonService.deletePerson(id);
  this.closePopup();
  this.cancelEdit();
  location.reload();
}
onClose(){}
  editPersonfunc(pers: Person){
    this.reg=false;
    this.edit=true;
    this.person=pers;
  }
  cancelEdit() {
    this.edit = false;
    this.reg = false;
    }
    async savePerson(p: Person): Promise<void> {
      p.mgr = this.commonService.user.id;
      if(p.name.length<3||p.phone.length<11 || p.phone.length>11)
        {
        window.alert("Please Enter Correct Credentials");
      }
      else{
      try
      {
        const result = await this.commonService.registerPerson(p);
          if (result) {
           if(this.reg){window.alert("Person registration Successful");}
           else if((this.edit)) {window.alert("Person Update Successful");}
           this.ngOnInit();
          }
      }
      catch(err: any) {
        window.alert(err.messages);
      }
  }
}
}