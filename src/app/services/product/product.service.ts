import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:8000/produits';
  getProducts() {
    return this.http.get<any[]>(`${this.apiUrl}/distinct-reference`);
  }
  getProduct(reference: number) {
    return this.http.get<any[]>(`${this.apiUrl}/reference/${reference}`);
  }
}
