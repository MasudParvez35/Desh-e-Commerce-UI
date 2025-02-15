import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSignup() {
    if (this.signupForm.invalid) return;

    this.http.post("http://localhost:5089/api/Account/register", this.signupForm.value).subscribe(
      (res: any) => {
        if (res.message === "User registered successfully!") {
          alert("Signup Successful! Please log in.");
          this.router.navigateByUrl('/login');
        } else {
          alert(res.message);
        }
      },
      (error) => {
        console.error("Signup error:", error);
        alert(error.error?.message);
      }
    );
  }
}
