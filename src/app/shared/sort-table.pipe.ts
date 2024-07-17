import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash'; 
@Pipe({
  name: "sortTable",
  standalone: true
})
export class SortTablePipe implements PipeTransform {
  transform(array: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] {
      return orderBy(array, [field], [order]);
  }
}