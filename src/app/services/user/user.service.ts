import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId: number | null;
  user: any;

  getUserById(id: number) {
    return this.http.get(`https://vetu.online/user/${id}`);
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

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('orderId');
    this.user = null;
    this.userId = null;
    // this.router.navigate(['/login']);
  }

  updateUser(obj: any) {
    const id = obj.id;
    const updatedObj = { ...obj, code_postal: obj.codePostal };
    delete updatedObj.id;
    delete updatedObj.password;
    delete updatedObj.roles;
    delete updatedObj.userIdentifier;
    delete updatedObj.codePostal;
    return this.http.put(`https://vetu.online/userUpdate/${id}`, updatedObj);
  }

  constructor(private http: HttpClient, private router: Router) {
    let id = Number(localStorage.getItem('user')) || null;
    this.userId = id;
  }
}
