import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);  // Corrected to use ActivatedRoute
  router = inject(Router);
  user: any = null;
  userId: number = 0;

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));  // Using ActivatedRoute to get the 'id' param
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    this.http.post<any>(`http://localhost:5089/api/Account/get-user-by-id/${this.userId}`, {}).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  goBackToList() {
    this.router.navigate(['/employee-list']);  // Navigation works correctly
  }
}
