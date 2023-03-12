import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UserService } from 'src/app/services/user/user.service';
import { UsercartService } from 'src/app/services/usercart/usercart.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Voulez-vous vraiment vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Non',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, me déconnecter',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
        this.cartService.resetCartItems();
        this.orderService.orderId = null;
        this.auth.hasntConnectedYet = true;
        this.userCartService.dataLoaded = false;
        this.router.navigate(['/login']);
        Swal.fire({
          icon: 'info',
          title: 'Vous avez été déconnecté',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
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
