import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [CommonModule], 
})
export class DashboardComponent implements OnInit {
  http = inject(HttpClient);
  users: any[] = [];
  router: any;

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
}
