import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.scss'],
})
export class FinalizeOrderComponent {
  commandeLoaded = false;
  totalPrice!: number;
  user!: any;
  authorizePayment = false;

  goBack() {
    this.location.back();
  }

  passOrder() {
    this.orderService.validateOrder().subscribe((data: any) => {
      if (data[1] === 200) {
        console.log(data);
        this.cartService.resetCartItems();
        this.orderService
          .createOrder(Number(localStorage.getItem('user')))
          .subscribe((data: any) => {
            this.orderService.orderId = data.created;
            localStorage.setItem('orderId', data.created);
            this.cartService.loadCartItemsFromDb();
            this.router.navigate(['/']);
          });
        this.orderService.loadPastCommandes = false;
        Swal.fire({
          title: 'Congratulations',
          text: 'Your order has been passed',
          icon: 'success',
          timer: 2000,
          background: '#040037',
          color: '#F3F3F3',
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          text: 'There has been an error, try again',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  }

  ngOnInit(): void {
    let panier: any[] = this.cartService.getCartItems();
    console.log(panier);
    if (panier.length > 0) {
      this.totalPrice = panier.reduce(
        (total: number, item: any) => total + item.prix * item.quantite,
        0
      );
      this.userService.getUser().subscribe((data: any) => {
        if (data === null) {
          this.snackBar.open(
            'Vous devez être connecté pour passer commande',
            '❕',
            {
              duration: 2500,
              panelClass: ['warning-snack'],
            }
          );
          this.router.navigate(['/login']);
        }
        this.user = data;
        console.log(data);
      });
    } else {
      this.router.navigate(['/cart']);
    }
  }
  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private orderService: OrdersService,
    private location: Location
  ) {}
}
