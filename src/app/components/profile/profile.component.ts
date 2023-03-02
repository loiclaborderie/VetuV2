import { Component } from '@angular/core';
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

  signOut() {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      this.userService.logout();
      this.cartService.resetCartItems();
      this.orderService.orderId = null;
      this.auth.hasntConnectedYet = true;
      this.userCartService.dataLoaded = false;
      // let cartItems = this.cartService.getCartItems();
      // if (cartItems.length > 0) {
      // localStorage.setItem('cart', JSON.stringify(cartItems));
      // }
      this.router.navigate(['/login']);
    }
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private cartService: CartService,
    private orderService: OrdersService,
    private auth: AuthService,
    private userCartService: UsercartService
  ) {}
}
