import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.scss'
})
export class HamburgerComponent {
  @Input() init!: boolean;
  @Output() opened = new EventEmitter<any>();

  active = false;
  burgers=false;
  ngOnInit() {
    this.active = this.init || false;
  }

  onBurgerClicked() {
    this.active = !this.active;
    this.opened.emit();
    this.burgers = !this.burgers;
  }
}
