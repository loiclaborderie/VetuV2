import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import sha1 from 'sha1';
import { Observable } from 'rxjs';
import { Token } from 'src/app/_interfaces/token';
import { UserService } from '../user/user.service';
import { changePasswordResponse } from 'src/app/_interfaces/changePasswordResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public hasntConnectedYet = true;

  constructor(private http: HttpClient, private userService: UserService) {}

  login(email: string, password: string): Observable<Token> {
    const content = {
      email: email,
      password: sha1(password),
    };
    return this.http.post<Token>(
      'https://vetu.online/api2/login_check',
      content
    );
  }

  register(content: any) {
    return this.http.post('https://vetu.online/user/create', content);
  }

  changePassword(data: any) {
    console.log(this.userService.userId);
    return this.http.put<changePasswordResponse>(
      `https://vetu.online/userUpdate/password/${this.userService.userId}`,
      data
    );
  }
}
