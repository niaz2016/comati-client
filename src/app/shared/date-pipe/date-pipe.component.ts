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
}
