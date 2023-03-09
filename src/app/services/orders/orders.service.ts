import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = 'http://127.0.0.1:8000/commande';
  public orderId: number | null = null;
  loadPastCommandes = false;
  pastOrders: any[] = [];

  getPastOrders() {
    return this.pastOrders;
  }

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

  changeProductQuantityInOrder(item: any) {
    return this.http.patch(
      `http://127.0.0.1:8000/detailcommande/change/${this.orderId}`,
      item
    );
  }

  addProductToDb(item: any) {
    const content = {
      id_produit: item.id,
      quantite: item.quantite,
    };

    return this.http.post(
      `http://127.0.0.1:8000/detailcommande/add/${this.orderId}`,
      JSON.stringify(content)
    );
  }

  validateOrder() {
    return this.http.get(`${this.baseUrl}/finish/${this.orderId}`);
  }

  deleteCurrentOrder() {
    return this.http.delete(`${this.baseUrl}/delete/${this.orderId}`);
  }

  getCurrentOrderByUser(id: number) {
    return this.http.get(`http://127.0.0.1:8000/getCurrentOrderByUser/${id}`);
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('orderId')) {
      this.orderId = JSON.parse(localStorage.getItem('orderId') || 'null');
    }
  }
}
