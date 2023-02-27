import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];
  loggedUserCart: any[] = [];

  addCartItem(cartItem: any) {
    const existingItem = this.cartItems.find((item) => item.id === cartItem.id);
    if (existingItem) {
      existingItem.quantite++;
    } else {
      cartItem.quantite = 1;
      this.cartItems.push(cartItem);
    }
    console.log(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }
  getCountItems() {
    return this.cartItems.reduce((total, item) => total + item.quantite, 0);
  }

  // getLoggedUserCart(id:number){
  //   return
  // }
  loadFirstCountCart() {
    console.log('methode lancée');
    if (localStorage.getItem('cart')) {
      let savedCart = localStorage.getItem('cart') as string;
      let cart = JSON.parse(savedCart);
      return cart.reduce(
        (total: number, item: any) => total + item.quantite,
        0
      );
    }
  }

  loadCartItemsFromLocalStorage() {
    if (localStorage.getItem('cart')) {
      let savedCart = localStorage.getItem('cart') as string;
      this.cartItems = JSON.parse(savedCart);
    }
  }

  constructor(http: HttpClient) {
    this.loadCartItemsFromLocalStorage();
  }
}
