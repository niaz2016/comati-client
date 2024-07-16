import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../models/person';
import { CommonService } from '../../services/common.service';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopupComponent } from '../../shared/popup/popup.component';
@Component({
  selector: 'app-register-person',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss'],
})
export class RegisterPersonComponent implements OnInit {
  person:Person = {
    id:0,
    name: '',
    phone: '',
    address: '',
    remarks: '',
  };
  faEdit = faEdit;
  edit=false;
  reg=true;
  persons: Person[]=[];
  totalCount: number = this.commonService.persons.length;
  constructor(private commonService: CommonService){  }
  async ngOnInit() {
    this.persons= await this.commonService.getPersons();    
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
del(id: number){
  this.commonService.deletePerson(id);
  this.closePopup();
  this.cancelEdit();
}
closePopup() {
  this.popupRef?.destroy();
}
onClose(){}
  editPersonfunc(pers: Person){
    this.reg=false;
    this.edit=true;
    this.person=pers;
  }
  cancelEdit() {
    this.edit = false;
    this.reg = true;
    this.person.id=0;
    this.person.name='';
    this.person.phone='';
    this.person.address='';
    this.person.remarks='';
    this.ngOnInit();
    }
    
    async savePerson(): Promise<void> {
      
      if(this.person.name.length<3||this.person.phone.length<11 || this.person.phone?.length>11)
        {
        window.alert("Please Enter Correct Credentials");
      }
      try
      {
        const result = await this.commonService.registerPerson(this.person);
          if (result) {
           if(this.reg){window.alert("Person registration Successful");}
           else if((this.edit)) {window.alert("Person Update Successful");}
           this.cancelEdit();
          }
      }
      catch(err: any) {
        window.alert(err.Error);
      }
  }
}