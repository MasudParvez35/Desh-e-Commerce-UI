import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logiObj: any = {
    "userName": "",
    "password": ""
  };

  http= inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  // encriptData(data: any) {
  //   return CryptoJS.AES.encrypt(data,Constant.EN_KEY).toString();
  // }

  onLogin() {
    this.http.post("http://localhost:5089/api/Account/login", this.logiObj).subscribe(
      (res: any) => {
        if (res.result) {
          alert("Login Success");
          localStorage.setItem('loginToken', res.data.token);
          this.authService.setUser(this.logiObj.userName); 
          this.router.navigateByUrl('dashboard');
        } else {
          alert(res.message);
        }
      },
      (error) => {
        console.error("Login error:", error);
        alert(error.error?.message);
      }
    );
  }
}
