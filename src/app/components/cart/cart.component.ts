import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UsercartService } from 'src/app/services/usercart/usercart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: any[] = [];
  userCart: any[] = [];
  totalPrice!: number;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private userCartService: UsercartService
  ) {}

  console() {
    console.log(this.cartItems);
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    if (this.cartItems) {
      this.totalPrice = this.cartItems.reduce(
        (acc, item) => acc + item.prix * item.quantite,
        0
      );
    }

    //On va regarder si on a un utilisateur connecté pour pouvoir aller récuperer son panier
    if (localStorage.getItem('user') && !this.userCartService.userCartFetched) {
      console.log(this.userCartService.userCartFetched + 'is now set to true');
      this.userCartService.userCartFetched = true; // set flag to true
      console.log(this.userCartService.userCartFetched);
      this.orderService
        .getCurrentOrderByUser(Number(localStorage.getItem('user')))
        .subscribe((data: any) => {
          console.log(data);
          const newItems = data.details.map((item: any) => item.produit);
          console.log(newItems);
          newItems.forEach((element: any) => {
            console.log('fetch is supposed to happen once only');
            this.cartService.addCartItem(element);
          });
          this.cartItems = this.cartService.getCartItems();
          this.totalPrice = this.cartItems.reduce(
            (acc, item) => acc + item.prix * item.quantite,
            0
          );
        });
    }
  }
}
