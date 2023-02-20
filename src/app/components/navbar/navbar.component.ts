import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import {
  trigger,
  state,
  transition,
  animate,
  style,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('cartItemCount', [
      state(
        'active',
        style({
          transform: 'scale(1.8)',
          backgroundColor: '#040037',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'scale(1.15)',
        })
      ),
      transition('inactive => active', animate('0.01s linear')),
      transition('active => inactive', animate('0.4s ease-out')),
    ]),
  ],
})
export class NavbarComponent {
  title = 'vetu';
  cartItems: any[] = [];
  currentItemCount: number = 0;
  prevItemCount: number = 0;
  animationState: string = 'inactive'; // Add this line

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    if (this.cartItems.length == 0) {
      this.cartItems = this.cartService.loadCartItemsFromLocalStorage();
    }
  }

  ngDoCheck() {
    if (this.currentItemCount !== this.cartItems.length) {
      this.prevItemCount = this.currentItemCount;
      this.currentItemCount = this.cartItems.length;
      this.animationState = 'active';
      setTimeout(() => (this.animationState = 'inactive'), 200);
    }
  }

  backToMenu() {
    this.router.navigate(['/products']);
  }

  goToPanier() {
    this.router.navigate(['/cart']);
  }
}
