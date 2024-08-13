import { Routes } from '@angular/router';
import { RegisterPersonComponent } from './components/register-person/register-person.component';
import { AddComatiComponent } from './components/add-comati/comati.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LoginComponent } from './components/login/login.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
    {
        path: 'dash-board', component: DashBoardComponent, canActivate: [AuthService]
    },
    {
        path: 'add-comati', component: AddComatiComponent, canActivate: [AuthService]
    },
    {
        path: 'add-member', component: AddMemberComponent, canActivate: [AuthService]
    },
    {
        path: 'add-payment', component: AddPaymentComponent, canActivate: [AuthService]
    },
    {
        path: 'reg-person', component: RegisterPersonComponent, canActivate: [AuthService]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'person-details', component: PersonDetailsComponent, canActivate: [AuthService]
    },
];
