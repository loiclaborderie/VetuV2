import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

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

  passOrder() {
    alert('finished');
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
            'OK'
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
    private snackBar: MatSnackBar
  ) {}
}
