import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = 'http://127.0.0.1:8000/commande';

  getOrdersByUserId(id: number) {
    return this.http.get(`http://127.0.0.1:8000/getAllcommandesByUser/${id}`);
  }
  constructor(private http: HttpClient) {}
}
