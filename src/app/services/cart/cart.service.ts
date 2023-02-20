import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  addCartItem(cartItem: any) {
    this.cartItems.push(cartItem);
  }

  getCartItems() {
    return this.cartItems;
  }

  loadCartItemsFromLocalStorage() {
    if (localStorage.getItem('cart')) {
      let savedCart = localStorage.getItem('cart') as string;
      return (this.cartItems = JSON.parse(savedCart));
    }
  }

  constructor() {}
}
