import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = 'https://vetu.online/commande';
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
    return this.http.get(`https://vetu.online/getAllcommandesByUser/${id}`);
  }

  getPastOrdersByUserId(id: number) {
    return this.http.get(`https://vetu.online/getAllPastcommandesByUser/${id}`);
  }

  changeProductQuantityInOrder(item: any) {
    return this.http.patch(
      `https://vetu.online/detailcommande/change/${this.orderId}`,
      item
    );
  }

  deleteProductFromOrder(item: any) {
    const data = { id: item.id };
    return this.http.put(
      `${this.baseUrl}/delete/${this.orderId}/product`,
      data
    );
  }

  addProductToDb(item: any) {
    const content = {
      id_produit: item.id,
      quantite: item.quantite,
    };

    return this.http.post(
      `https://vetu.online/detailcommande/add/${this.orderId}`,
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
    return this.http.get(`https://vetu.online/getCurrentOrderByUser/${id}`);
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('orderId')) {
      this.orderId = JSON.parse(localStorage.getItem('orderId') || 'null');
    }
  }
}
