import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Field {
  name: string;
  caption: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data!: any[];
  @Input() hiddenFields: string[] = [];
  fields: Field[] = [];

  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.fields = this.extractFields(this.data[0]);
      this.hiddenFields = this.initializeHiddenFields(this.hiddenFields, this.fields);
    }
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
      .replace(/([A-Z])/g, ' $1')  // Add a space before capital letters
      .replace(/^./, str => str.toUpperCase());  // Capitalize the first letter
  }
}
