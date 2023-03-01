import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  @Input() id?: string;
  isOpen = false;
  private element: any;
  data: any;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private productService: ProductService
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    // add self (this modal instance) to the modal service so it can be opened from any component
    this.modalService.add(this);

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    if (this.id) {
      let number: number = +this.id.replace('modal-', '');
      this.productService.getProduct(number).subscribe((data) => {
        this.data = data;
        console.log(data);
      });
    }
    this.element.style.display = 'block';
    this.element.style.display = 'block';
    console.log(this.element);
    document.body.classList.add('jw-modal-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.isOpen = false;
  }
}
