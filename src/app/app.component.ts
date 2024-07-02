import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet, RegisterPersonComponent, AddComatiComponent, AddPaymentComponent, AddMemberComponent, DashBoardComponent, LoginComponent],
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[]
})
export class AppComponent {
  title = 'comati';
}
