import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-tab-orders',
  templateUrl: './tab-orders.component.html',
  styleUrls: ['./tab-orders.component.scss'],
})
export class TabOrdersComponent {
  @Input()
  user!: any;
  pastOrders!: any;
  ongoingArray!: any;
  orderArray!: any;

  console() {
    console.log(this.orderArray);
    console.log(this.ongoingArray);
    console.log(this.pastOrders);
  }

  ngOnInit(): void {
    if (this.auth.hasntConnectedYet) {
      this.orderService.getOrdersByUserId(this.user.id).subscribe((data) => {
        console.log('fetched all the array');
        this.orderArray = data;
        this.ongoingArray = this.orderArray.filter(
          (order: any) => order.statut === 'en cours'
        );
        this.pastOrders = this.orderArray.filter(
          (order: any) => order.statut === 'terminée'
        );

        console.log(this.ongoingArray);
        if (this.ongoingArray.length === 0) {
          //pas de commande existante pour l'utilisateur, on va donc la créer

          console.log('no ongoing orders');
          console.log('on va donc la créer');
          this.orderService.createOrder(this.user.id).subscribe((data) => {
            console.log('commande créée');
            console.log(data);
          });
        } else {
          console.log('il y a bien une commande');
        }
        this.auth.hasntConnectedYet = false;
        // Ca permet de ne fetch ces données qu'une fois
      });
    }
  }

  constructor(private orderService: OrdersService, private auth: AuthService) {}
}
