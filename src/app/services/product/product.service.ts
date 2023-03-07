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
  getAllCategories() {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }
  getProductsByCategory(category: string) {
    return this.http.get<any[]>(`${this.apiUrl}/categorie/${category}`);
  }
  getProductsByCategoryAndGenre(category: string, genre: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}/categorie/${category}/${genre}`
    );
  }
  getProductsBySearchTerm(term: string, page: number, sortBy: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}/search/${term}?page=${page}&sortBy=${sortBy}`
    );
  }
}
