import { Component, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-tab-orders',
  templateUrl: './tab-orders.component.html',
  styleUrls: ['./tab-orders.component.scss'],
})
export class TabOrdersComponent {
  @Input()
  user!: any;
  orderArray!: any;
  ongoingArray!: any;
  finishedArray!: any;

  console() {
    console.log(this.orderArray);
    console.log(this.ongoingArray);
    console.log(this.finishedArray);
  }

  ngOnInit(): void {
    this.orderService.getOrdersByUserId(this.user.id).subscribe((data) => {
      console.log(data);
      this.orderArray = data;
      this.ongoingArray = this.orderArray.filter(
        (order: any) => order.statut === 'en cours'
      );
      this.finishedArray = this.orderArray.filter(
        (order: any) => order.statut === 'terminée'
      );
    });
  }

  constructor(private orderService: OrdersService) {}
}
