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

  sendAllItemsToDb() {
    if (localStorage.getItem('cart')) {
      let items = JSON.parse(localStorage.getItem('cart') || '[]');
      items.map((item: any) => {
        console.log(`Item n°${item.id}, quantité: ${item.quantite}`);
      });
    }
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
          this.orderService.createOrder(this.user.id).subscribe((data: any) => {
            console.log('commande créée');
            console.log(data);
            this.orderService.orderId = data.created;
            console.log('on rajoute les items du localStorage si existants');
            // this.sendAllItemsToDb();
          });
        } else {
          console.log('il y a bien une commande');
          this.orderService.orderId = this.ongoingArray[0].id;
          console.log(this.orderService.orderId);
          console.log('on rajoute les items du localStorage si existants');
          // this.sendAllItemsToDb();
        }
        this.auth.hasntConnectedYet = false;
        // Ca permet de ne fetch ces données qu'une fois
      });
    }
  }

  constructor(private orderService: OrdersService, private auth: AuthService) {}
}
