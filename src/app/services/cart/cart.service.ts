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

  constructor() {}
}
