import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  constructor(){}
  
@Input() title: string = '';
@Input() message: string = '';
close!: () => void;
del!: () => void;
  
  }
