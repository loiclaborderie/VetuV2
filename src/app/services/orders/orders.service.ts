import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = 'http://127.0.0.1:8000/commande';
  public orderId!: number;

  createOrder(id: number) {
    return this.http.post(`${this.baseUrl}/create/${id}`, null);
  }

  getOrdersByUserId(id: number) {
    return this.http.get(`http://127.0.0.1:8000/getAllcommandesByUser/${id}`);
  }

  getPastOrdersByUserId(id: number) {
    return this.http.get(
      `http://127.0.0.1:8000/getAllPastcommandesByUser/${id}`
    );
  }

  getCurrentOrderByUser(id: number) {
    return this.http.get(`http://127.0.0.1:8000/getCurrentOrderByUser/${id}`);
  }
  constructor(private http: HttpClient) {}
}
