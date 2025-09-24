import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginObj: any = {
    "EmailId": "",
    "Password": ""
  }

  http = inject(HttpClient);
  routes = inject(Router);

  onLogin(){
    debugger;
    this.http.post("https://freeapi.miniprojectideas.com/api/User/Login", this.loginObj).subscribe((res:any)=>{
      if(res.result){
        alert("Login Susses");
        localStorage.setItem('angularToken', res.data.token);
        this.routes.navigateByUrl('dashboard');
      }else {
        alert(res.message);
      }
    });
  }

}
