import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import sha1 from 'sha1';
import { Observable } from 'rxjs';
import { Token } from 'src/app/_interfaces/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public hasntConnectedYet = true;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Token> {
    const content = {
      email: email,
      password: sha1(password),
    };
    return this.http.post<Token>(
      'http://127.0.0.1:8000/api2/login_check',
      content
    );
  }

  register(content: any) {
    return this.http.post('http://127.0.0.1:8000/user/create', content);
  }
}
