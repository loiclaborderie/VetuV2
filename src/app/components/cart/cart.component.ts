import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UsercartService } from 'src/app/services/usercart/usercart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems!: any[] | undefined;
  totalPrice!: number;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private userCartService: UsercartService,
    private snackBar: MatSnackBar
  ) {}

  console() {
    console.log(this.cartItems);
  }

  deleteOrder() {
    if (
      confirm('voulez-vous vraiment supprimer vider votre commande en cours ?')
    ) {
      console.log('Il veut vraiment la supprimer là');
      //On supprime de la base de données
      this.orderService.deleteCurrentOrder().subscribe((data) => {
        console.log(data);
      });
      this.cartService.resetCartItems();
      this.cartItems = this.cartService.getCartItems();
      this.totalPrice = 0;
      this.snackBar.open(`Votre panier a été supprimé`, 'OK');
    }
  }

  ngOnInit(): void {
    console.log(this.cartItems);
    if (this.cartService.cartFetched) {
      console.log('déjà loadé de la db');
      this.cartItems = this.cartService.getCartItems();
      console.log(this.cartItems);
      if (this.cartItems) {
        this.totalPrice = this.cartItems.reduce(
          (acc, item) => acc + item.prix * item.quantite,
          0
        );
      }
    } else {
      if (this.orderService.orderId) {
        console.log('load de la db');
        localStorage.setItem(
          'orderId',
          JSON.stringify(this.orderService.orderId)
        );
        this.cartService
          .loadCartItemsFromDbObservable()
          .subscribe((data: any) => {
            console.log(data);
            this.cartItems = data;
            this.cartService.setCartItems(this.cartItems);
            console.log(this.cartItems);
            this.cartService.cartFetched = true;
            if (this.cartItems) {
              this.totalPrice = this.cartItems.reduce(
                (acc, item) => acc + item.prix * item.quantite,
                0
              );
            }
          });
      }
    }

    //On va regarder si on a un utilisateur connecté pour pouvoir aller récuperer son panier

    // if (localStorage.getItem('user') && !this.userCartService.userCartFetched) {
    //   console.log(this.userCartService.userCartFetched + 'is now set to true');
    //   this.userCartService.userCartFetched = true; // set flag to true
    //   console.log(this.userCartService.userCartFetched);
    //   this.orderService
    //     .getCurrentOrderByUser(Number(localStorage.getItem('user')))
    //     .subscribe((data: any) => {
    //       console.log(data);
    //       const newItems = data.details.map((item: any) => item.produit);
    //       console.log(newItems);
    //       newItems.forEach((element: any) => {
    //         console.log('fetch is supposed to happen once only');
    //         this.cartService.addCartItem(element);
    //       });
    //       this.cartItems = this.cartService.getCartItems();
    //       this.totalPrice = this.cartItems.reduce(
    //         (acc, item) => acc + item.prix * item.quantite,
    //         0
    //       );
    //     });
    // }
  }
}
