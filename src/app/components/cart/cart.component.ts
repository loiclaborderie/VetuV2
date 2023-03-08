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
  cartItems!: any[];
  totalPrice!: number;
  showNumberInput: boolean[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private userCartService: UsercartService,
    private snackBar: MatSnackBar
  ) {}

  console() {
    console.log(this.cartItems);
  }

  range(limit: number): number[] {
    limit > 9 ? (limit = 9) : (limit = limit);
    //Je limite à 9 la quantité max selectionnable via le select
    //Cette méthode va servir à loop sur les quantité pour les select
    return Array.from({ length: limit }, (_, i) => i + 1);
  }

  quantity(event: any, index: number) {
    let value = event.target.value;
    let id = event.target.name;
    let product: any = this.cartItems[index];
    if (value === 'custom') {
      // THIS IF IS ONLY TO MAKE THE NUMBER INPUT APPEAR
      this.showNumberInput[index] = true;
      let input = document.querySelector(
        `input[name='${id}']`
      ) as HTMLInputElement;
      console.log(input);
      setTimeout(() => {
        // si pas de timeout cela ne marche pas bizarrement
        input.focus();
        // POUR QUE CA RENTRE DIRECT DANS L'INPUT
      }, 0);
      console.log('!!!');
    } else {
      // CA C'EST LA PARTIE MODIF DE LA QUANTITE
      console.log(index, product);
      if (+value > product.stock) {
        console.log('ON EST ICI');
        console.log(id);
        console.log('Pas assez de stocks', value);
        value = product.stock;
        event.target.value = +value;
      }

      if (Number(value) < 9) {
        // Hide the number input here, except if the value is over 9
        this.showNumberInput[index] = false;
      }

      console.log(
        'ici si false, input ne pas pas réapparaitre',
        this.showNumberInput[index]
      );
      let content: { id: number; quantite: number } = {
        id: product.id,
        quantite: Number(value),
      };
      console.log('TRES IMPORTANT', content);

      // Do something with the selected quantity here
      this.orderService
        .changeProductQuantityInOrder(content)
        .subscribe((data: any) => {
          console.log(data);
        });
      product.quantite = +value;
      this.totalPrice = this.cartItems.reduce(
        (acc, item) => acc + item.prix * item.quantite,
        0
      );
    }
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
    if (this.cartService.cartFetched) {
      console.log('déjà loadé de la db');
      this.cartService
        .loadCartItemsFromDbObservable()
        .subscribe((data: any) => {
          console.log('BIZARREMENT ICI CA MARCHE PAS');
          this.cartItems = data;
          this.cartService.setCartItems(this.cartItems);
          console.log(data);
          // this.cartItems = this.cartService.getCartItems();
          console.log(this.cartItems);
          if (this.cartItems) {
            this.totalPrice = this.cartItems.reduce(
              (acc, item) => acc + item.prix * item.quantite,
              0
            );
          }
        });
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
            this.cartItems = data;
            console.log('BIZARREMENT ICI CA MARCHE');
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
  }
}
