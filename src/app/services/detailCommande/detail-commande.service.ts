import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetailCommandeService {
  getDetailCommandeById(url: string) {
    return this.http.get(`http://localhost:8000`);
  }

  constructor(private http: HttpClient) {}
}
