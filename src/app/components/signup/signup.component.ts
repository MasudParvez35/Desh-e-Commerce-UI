import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  selectedFile: File | null = null;

  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      imagePath: [''] 
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSignup() {
    if (this.signupForm.invalid || !this.selectedFile) {
      alert("Please fill all fields and upload an image!");
      return;
    }
  
    const formData = new FormData();
    formData.append("UserName", this.signupForm.value.userName);
    formData.append("Password", this.signupForm.value.password);
    formData.append("Image", this.selectedFile); // Ensure key name matches backend
  
    this.http.post("http://localhost:5089/api/Account/register", formData, {
      headers: { 'enctype': 'multipart/form-data' } // No 'Content-Type', let browser set it
    }).subscribe(
      (res: any) => {
        alert("Signup Successful! Please log in.");
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error("Signup error:", error);
        alert(error.error?.message);
      }
    );
  }  
}
