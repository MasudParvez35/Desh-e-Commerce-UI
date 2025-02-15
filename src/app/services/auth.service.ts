import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  user$ = this.userSubject.asObservable();

  setUser(username: string) {
    console.log("AuthService setUser called with: ", username);
    localStorage.setItem('username', username);
    this.userSubject.next(username);
  }

  logout() {
    console.log("AuthService logout called");
    localStorage.removeItem('username');
    localStorage.removeItem('loginToken');
    this.userSubject.next(null);
  }
}
