import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: any[] = [];
  totalPrice!: number;
  constructor(private cartService: CartService) {}

  console() {
    this.cartItems.map((item) => {
      //how to check if this item is here more than once?
    });
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
    if (this.cartItems.length == 0) {
      this.cartItems = this.cartService.loadCartItemsFromLocalStorage();
    }
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.prix, 0);
  }
}
