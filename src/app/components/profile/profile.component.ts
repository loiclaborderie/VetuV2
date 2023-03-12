import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UserService } from 'src/app/services/user/user.service';
import { UsercartService } from 'src/app/services/usercart/usercart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: any;

  ngOnInit(): void {
    console.log(this.auth.hasntConnectedYet);
    this.userService.getUser().subscribe((data: any) => {
      if (data === null) {
        this.router.navigate(['/login']);
      }
      this.user = data;
    });
  }

  goBack() {
    this.location.back();
  }

  signOut() {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      this.userService.logout();
      this.cartService.resetCartItems();
      this.orderService.orderId = null;
      this.auth.hasntConnectedYet = true;
      this.userCartService.dataLoaded = false;
      this.router.navigate(['/login']);
      this.snackBar.open(`Vous avez été déconnecté`, 'OK', {
        duration: 2500,
        panelClass: ['success-snackbar'],
      });
    }
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private cartService: CartService,
    private orderService: OrdersService,
    private auth: AuthService,
    private userCartService: UsercartService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}
}
