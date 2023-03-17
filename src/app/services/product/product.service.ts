import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://vetu.online/produits';
  getProducts(page: number, sortBy: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}/distinct-reference?page=${page}&sortBy=${sortBy}`
    );
  }
  getProduct(reference: number) {
    return this.http.get<any[]>(`${this.apiUrl}/reference/${reference}`);
  }
  getAllCategories() {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }
  getProductsByCategory(category: string, page: number, sortBy: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}/categorie/${category}?page=${page}&sortBy=${sortBy}`
    );
  }
  getProductsByCategoryAndGenre(
    category: string,
    genre: string,
    page: number,
    sortBy: string
  ) {
    return this.http.get<any[]>(
      `${this.apiUrl}/categorie/${category}/${genre}?page=${page}&sortBy=${sortBy}`
    );
  }
  getProductsBySearchTerm(term: string, page: number, sortBy: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}/search/${term}?page=${page}&sortBy=${sortBy}`
    );
  }
}
