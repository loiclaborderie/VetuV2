import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UsercartService } from 'src/app/services/usercart/usercart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems!: any[];
  totalPrice!: number;
  showNumberInput: boolean[] = [];
  // dataLoaded = false;
  placeholder = true;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private userCartService: UsercartService,
    private snackBar: MatSnackBar
  ) {}

  range(limit: number): number[] {
    limit > 9 ? (limit = 9) : (limit = limit);
    //Je limite à 9 la quantité max selectionnable via le select
    //Cette méthode va servir à loop sur les quantité pour les select
    return Array.from({ length: limit }, (_, i) => i + 1);
  }

  console() {
    console.log(this.cartItems);
  }

  articleNum(cart: any): number {
    return cart.reduce((acc: number, item: any) => acc + item.quantite, 0);
  }

  quantity(event: any, index: number) {
    let value = event.target.value;
    let id = event.target.name;
    let product: any = this.cartItems[index];
    if (value === 'custom') {
      // THIS IF IS ONLY TO MAKE THE NUMBER INPUT APPEAR
      console.log('Ca marche');
      this.showNumberInput[index] = true;
      let input = document.querySelector(
        `input[name='${id}']`
      ) as HTMLInputElement;
      console.log(input);
      // product.quantite = 10;
      setTimeout(() => {
        // si pas de timeout cela ne marche pas bizarrement
        input.focus();
        // POUR QUE CA RENTRE DIRECT DANS L'INPUT
      }, 0);
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

      if (Number(value) <= 9) {
        // Hide the number input here, except if the value is over 9
        this.showNumberInput[index] = false;
      } else {
        this.showNumberInput[index] = true;
      }

      this.animateSelect(id);

      this.animateInput(id);

      console.log(
        'ici si false, input ne pas pas réapparaitre',
        this.showNumberInput[index]
      );
      let content: { id: number; quantite: number } = {
        id: product.id,
        quantite: Number(value),
      };
      console.log('TRES IMPORTANT', content);

      if (this.orderService.orderId) {
        this.orderService
          .changeProductQuantityInOrder(content)
          .subscribe((data: any) => {
            console.log(data);
          });
      } else {
        let newCart = this.cartItems;
        const indexFound = this.cartItems.findIndex(
          (obj) => obj.id === Number(id)
        );
        if (index !== -1) {
          newCart[indexFound].quantite = Number(value); // Replace the quantite
        }
        this.cartService.setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      // Do something with the selected quantity here
      product.quantite = +value;
      this.calculateTotalPrice();
    }
  }

  animateSelect(id: number) {
    let select = document.querySelector(
      `select[name='${id}']`
    ) as HTMLInputElement;
    if (select) {
      // alert('test');
      select.animate(
        [
          // Image clé initiale
          { backgroundColor: '#040037' },
          // Image clé finale
          {
            backgroundColor: 'linear-gradient(#a8ff78 , #78ffd6 )',
          },
        ],
        {
          // Durée de l'animation en millisecondes
          duration: 400,
          // Nombre de répétitions de l'animation
          iterations: 1,
          // Mode de remplissage de l'animation
        }
      );
    }
  }

  animateInput(id: number) {
    let input = document.querySelector(
      `input[name='${id}']`
    ) as HTMLInputElement;
    if (input) {
      input.blur();
      input.animate(
        [
          { outline: 'none' }, // Image clé finale
          { outline: '1px solid #009e32' },
        ],
        { duration: 700 }
      );
      input.animate(
        [
          // Image clé initiale
          { border: '2px solid #040037' }, // Image clé finale
          { border: '1px solid #009e32' },
        ],
        { duration: 700 }
      );
    }
  }

  alert() {
    Swal.fire({
      title: 'Congratulations',
      text: 'Your order has been passed',
      icon: 'success',
      timer: 2000,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      background: '#040037',
      color: '#F3F3F3',
      showConfirmButton: false,
    });
  }

  deleteProduct(index: number) {
    let product: any = this.cartItems[index];
    if (confirm('voulez vous vraiment supprimer le produit ?')) {
      console.log('il veut supprimer le produit');
      console.log(product);
      console.log(product.id);
      if (this.orderService.orderId) {
        this.orderService.deleteProductFromOrder(product).subscribe((data) => {
          console.log(data);
          const indexFound = this.cartItems.findIndex(
            (obj) => obj.id === product.id
          );
          if (indexFound !== -1) {
            this.cartItems.splice(indexFound, 1); // Replace the quantite
          }
          this.cartService.setCartItems(this.cartItems);
          this.calculateTotalPrice();
        });
      } else if (localStorage.getItem('cart')) {
        const indexFound = this.cartItems.findIndex(
          (obj) => obj.id === product.id
        );
        if (indexFound !== -1) {
          this.cartItems.splice(indexFound, 1); // Replace the quantite
          console.log('supprimé du panier');
        }
        this.cartService.setCartItems(this.cartItems);
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.calculateTotalPrice();
      }
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.prix * item.quantite,
      0
    );
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
      localStorage.removeItem('cart');
      this.cartService.resetCartItems();
      this.cartItems = this.cartService.getCartItems();
      this.totalPrice = 0;
      this.snackBar.open(`Votre panier a été supprimé`, 'OK', {
        duration: 2500,
        panelClass: ['success-snackbar'],
      });
    }
  }

  ngOnInit(): void {
    if (this.orderService.orderId) {
      localStorage.setItem(
        'orderId',
        JSON.stringify(this.orderService.orderId)
      );
      alert('load avec orderid');
      this.cartService
        .loadCartItemsFromDbObservable()
        .subscribe((data: any) => {
          console.log(data);
          this.placeholder = false;
          // this.dataLoaded = true;
          this.cartItems = data;
          this.cartService.setCartItems(this.cartItems);
          this.calculateTotalPrice();
        });
    } else if (localStorage.getItem('cart')) {
      this.placeholder = false;
      console.log(localStorage.getItem('cart'));
      this.cartItems = JSON.parse(localStorage.getItem('cart')!);
      console.log(JSON.parse(localStorage.getItem('cart') || 'marche pas'));
      if (this.cartItems) {
        // this.dataLoaded = true;
        this.calculateTotalPrice();
      }
    } else {
      this.placeholder = false;
      // this.dataLoaded = true;
      this.cartItems = this.cartService.getCartItems();
      this.calculateTotalPrice();
    }
  }
}
