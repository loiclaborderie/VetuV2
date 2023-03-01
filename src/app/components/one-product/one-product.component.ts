import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.scss'],
})
export class OneProductComponent {
  @Input()
  product: any;

  productSizes: any;
  constructor(protected modalService: ModalService) {}
}
