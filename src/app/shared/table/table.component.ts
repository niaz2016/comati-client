import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment'
import { SortTablePipe } from '../sort-table.pipe';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
interface Field {
  name: string;
  caption: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, SortTablePipe, FontAwesomeModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  faEdit = faEdit;
  //@Input() data!: any[];
  _data!:any[];
  @Input() header!: string;
  @Input() footer!: string;
  @Input() hiddenFields: string[] = [];
  @Input() fields: Field[] = [];
  @Input() dateFieldNames: string[] =['openingMonth', 'end_Date', 'paymentDate'];
  @Output() editRow = new EventEmitter<any>();
  @Input() set data(data:any[]) {
    if (data && data.length > 0) {
      this.fields = this.extractFields(data[0]);
      this.hiddenFields = this.initializeHiddenFields(this.hiddenFields, this.fields);
      this._data=data;
    }
  }
  get data() {
    return this._data;
  }


  ngOnInit(): void {
    
  }

  extractFields(item: any): Field[] {
    return Object.keys(item).map(key => ({
      name: key,
      caption: this.camelCaseToTitle(key)
    }));
  }

  initializeHiddenFields(providedHiddenFields: string[], fields: Field[]): string[] {
    const hiddenFields = new Set(providedHiddenFields);

    fields.forEach(field => {
      if (field.name.toLowerCase().includes('id')) {
        hiddenFields.add(field.name);
      }
    });

    return Array.from(hiddenFields);
  }

  isFieldHidden(fieldName: string): boolean {
    return this.hiddenFields.includes(fieldName);
  }

  camelCaseToTitle(camelCase: string): string {
    return camelCase
      .replace(/_/, ' ')
      .replace(/([A-Z])/g, ' $1')  // Add a space before capital letters

      .replace(/_/, '')
      .replace(/^./, str => str.toUpperCase());  // Capitalize the first letter
  }
  formatValue(value:any,field:string){
    if(field.toLowerCase().includes('month')){
      return value = moment(value).format('MMMM YYYY');
    }
    if(field.toLowerCase().includes('date')){
      return value = moment(value).format('DD MMMM YYYY');
    }
    return value;
  }
  isCurrentMonth(dateString: string): boolean {
    const date = new Date(dateString);
    const now = new Date();
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  }

  shouldHighlightRow(item: any): boolean {
    // Check if any of the specified date fields contain the current month
    return this.dateFieldNames.some(dateFieldName => this.isCurrentMonth(item[dateFieldName]));
  }
}
