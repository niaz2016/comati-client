import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
login() {
throw new Error('Method not implemented.');
}
cancelEdit() {
throw new Error('Method not implemented.');
}
 
user: User = {
    id: 0,
    name: '',
    phone: '',
    address: '',
    password: '',
  };
  rePassword: string = '';
  
  constructor(private commonService: CommonService, private router: Router)
  { 
  
  }
  ngOnInit(): void {
    
  }
  del(userId: number)
  {
    
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
            location.reload();
          }}
        catch(Err: any){window.alert(Err.error.message);
        }
          
      }
    }
}
