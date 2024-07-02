import { Routes } from '@angular/router';
import { RegisterPersonComponent } from './components/register-person/register-person.component';
import { AddComatiComponent } from './components/add-comati/comati.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
    {
        path: 'dash-board', component: DashBoardComponent
    },
    {
        path: 'add-comati', component: AddComatiComponent
    },
    {
        path: 'add-member', component: AddMemberComponent
    },
    {
        path: 'add-payment', component: AddPaymentComponent
    },
    {
        path: 'reg-person', component: RegisterPersonComponent
    },
    {
        path: 'login', component: LoginComponent
    }

];
