import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-pipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-pipe.component.html',
  styleUrl: './date-pipe.component.scss'
})
export class DatePipeComponent {
@Input() date!: Date|undefined;
@Input() fullDate!: Date | undefined;

formatMonthYear(dateString: string) {
  
  const date = new Date(dateString);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];

  // Format the date as "MMM yyyy"
  return `${month} ${year}`;
}
}
