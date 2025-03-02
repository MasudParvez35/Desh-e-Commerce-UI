import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  http = inject(HttpClient);
  router = inject(Router);
  users: any[] = [];
  
    ngOnInit() {
      this.fetchUsers();
    }
  
    fetchUsers() {
      this.http.get<any[]>("http://localhost:5089/api/Account/get-all-users").subscribe(
        (response) => {
          this.users = response;
        },
        (error) => {
          console.error("Error fetching users:", error);
        }
      );
    }

    viewDetails(userId: number) {
      this.router.navigate(['/employee-details', userId]);
    }
}
