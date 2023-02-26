import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-orders',
  templateUrl: './tab-orders.component.html',
  styleUrls: ['./tab-orders.component.scss'],
})
export class TabOrdersComponent {
  @Input()
  user!: any;
}
