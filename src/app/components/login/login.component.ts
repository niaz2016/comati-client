import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { User } from '../../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

 person: Person | undefined
user: User = {
  id: 0,
  name: '',
  phone: '',
  address: '',
  password: '',
  mgr: 0,
};
  rePassword: string = '';
  reg = false;
  log = true;
  constructor(private commonService: CommonService, private http: HttpClient, private authService: AuthService, private cookie: CookieService)
  { 
  }
  async login() {
    
    const params = new HttpParams().set('phone', this.user.phone).set('password', this.user.password);
      try {
        this.user = await firstValueFrom(this.http.get<User>(this.commonService.userUrl, { params, withCredentials: true })) as User;
      if(this.user)
        {
        this.authService.login();
        this.commonService.login(this.user.id);}
        console.log(this.user.id)
      }
      catch(err: any){window.alert(err.error.message);}
  }
  cancelEdit() {
    this.user.name = '',
    this.user.phone = '',
    this.user.address = '',
    this.user.password = '',
    this.rePassword = ''
  }

  del(userId: number)
  {
    
  }
  switch(){
    if(this.log){this.log = false;}else{this.log = true;}
    if(this.reg){this.reg = false;} else { this.reg = true;}
  }
  
    async registerUser(): Promise<void> 
    {
      if(this.user.name.length<3||this.user.phone.length<11 || this.user.phone.length>11){
        window.alert("Please Ener Correct Name and Phone");
      }
      else if (this.user.password != this.rePassword)
        {window.alert("Password does not match");}
      else if (this.user.password.length<4){window.alert("Password must be atleast 4 digits long");}
      else if(this.user.password===this.rePassword)
        { try {const result = await this.commonService.registerUser(this.user);
          if (result)
          {
            window.alert("User registration Successful");
            this.commonService.router.navigateByUrl("/dash-board")
          }}
        catch(Err: any){window.alert(Err.error.message);
        }
          
      }
    }
}
