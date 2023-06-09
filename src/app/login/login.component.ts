import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../service/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form:FormGroup;
  user:User = {id:0,name:'',email: '', password:''};

  constructor(public apiService: ApiService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, [Validators.required,]),
    });
  }

  login(){
    if (this.form.valid) {
      this.user = this.form.value;
      console.log(this.user);
      this.apiService.login(this.user).subscribe(
        respose => {
          this.router.navigate([`admin/dashboard`]);
        }, err => {
          alert(err);
          console.log(err);
        }
      );
    }
  }
}
