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
      const id: string | null = localStorage.getItem('user');
      return this.getUserById(Number(id)).pipe(
        tap((data: any) => {
          this.user = data;
        })
      );
    }
    return of(null);
  }

  updateUser(obj: any) {
    const id = obj.id;
    const updatedObj = { ...obj, code_postal: obj.codePostal };
    delete updatedObj.id;
    delete updatedObj.password;
    delete updatedObj.roles;
    delete updatedObj.userIdentifier;
    delete updatedObj.codePostal;
    return this.http.put(`http://localhost:8000/userUpdate/${id}`, updatedObj);
  }

  constructor(private http: HttpClient, private router: Router) {}
}
