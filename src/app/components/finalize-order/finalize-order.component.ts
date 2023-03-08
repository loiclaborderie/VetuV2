import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.scss'],
})
export class FinalizeOrderComponent {
  commandeLoaded = false;
  totalPrice!: number;

  ngOnInit(): void {
    let panier: any[] = this.cartService.getCartItems();
    console.log(panier);
    if (panier.length > 1) {
      alert('Hop ca charge');
      this.totalPrice = panier.reduce(
        (total: number, item: any) => total + item.prix * item.quantite,
        0
      );
    } else {
      this.router.navigate(['/cart']);
    }
  }
  constructor(private cartService: CartService, private router: Router) {}
}
