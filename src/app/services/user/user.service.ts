import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId!: number;
  user: any;
  getUserById(id: number) {
    return this.http.get(`http://127.0.0.1:8000/user/${id}`);
  }
  getUser() {
    if (this.user) {
      return of(this.user);
    } else if (localStorage.getItem('user')) {
      const id = localStorage.getItem('user');
      return this.getUserById(Number(id)).pipe(
        tap((data: any) => {
          this.user = data;
        })
      );
    }
    return of(null);
  }
  // setUserId(id: number) {
  //   this.userId = id;
  // }
  constructor(private http: HttpClient, private router: Router) {}
}
