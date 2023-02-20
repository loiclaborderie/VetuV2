import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.scss'],
})
export class OneProductComponent {
  @Input()
  product: any;
  rand(num: number, num2?: number): number {
    if (num2) {
      return num2 + Math.floor(Math.random() * num + 1);
    } else {
      return Math.floor(Math.random() * num + 1);
    }
  }
}
