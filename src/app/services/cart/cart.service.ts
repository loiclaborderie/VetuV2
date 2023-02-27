import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsercartService } from '../usercart/usercart.service';

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

  getProductsFromCommandeId(id: number) {
    return this.http.get(`http://127.0.0.1:8000/detailcommande/get/${id}`);
  }

  loadCartItemsFromLocalStorage() {
    if (localStorage.getItem('cart')) {
      this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }

  loadCartItemsFromDb() {
    if (localStorage.getItem('orderId') && !this.userCartService.dataLoaded) {
      let commandeId = JSON.parse(localStorage.getItem('orderId') || '[]');
      this.userCartService.dataLoaded = true;
      console.log(commandeId);
      this.getProductsFromCommandeId(commandeId).subscribe((data: any) => {
        this.cartItems = data;
        console.log(this.cartItems);
      });
    }
  }

  constructor(
    private http: HttpClient,
    private userCartService: UsercartService
  ) {
    this.loadCartItemsFromLocalStorage();
    // rajouter la méthode loadCartItemsFromDb pour aller fetch toutes les commandes et visualiser le nombres d'objets dans le panier au launch
    this.loadCartItemsFromDb();
  }
}
