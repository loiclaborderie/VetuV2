import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart/cart.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
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
  form: FormGroup;
  selectedSize!: string;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrdersService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.element = el.nativeElement;
    this.form = this.fb.group({
      size: [
        'Choisir une taille',
        [Validators.required, this.notNullValidator],
      ],
    });
  }

  notNullValidator(control: AbstractControl) {
    if (control.value === null || control.value === 'Choisir une taille') {
      return { notNull: true };
    }
    return null;
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

  selectSize() {
    console.log(this.form.value.size);
  }

  addToCart() {
    const productData = this.data[+this.form.value.size];
    console.log(productData);
    if (localStorage.getItem('user')) {
      // On n'utilise plus le localStorage si l'utilisateur est co
      const content = {
        id: productData.id,
        quantite: 1,
      };
      this.orderService
        .addProductToDb(content)
        .subscribe((dataFetched: any) => {
          console.log('added to db from localstorage');
          console.log(dataFetched);
          if (dataFetched[1] === 200) {
            this.cartService.addCartItem(productData);
            this.snackBar.open(`${productData.titre} ajouté au panier`, 'OK');
            this.close();
            productData.stock--;
            console.log(productData.stock);
          } else {
            this.close();
            this.snackBar.open(
              `${dataFetched[0] || "erreur lors de l'ajout au panier"}`,
              'OK'
            );
          }
        });
    } else {
      this.cartService.addCartItem(productData);
      let newCart = this.cartService.getCartItems();
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log('added to localstorage');
      productData.stock--;
      this.snackBar.open(`${productData.titre} ajouté au panier`, 'OK');
      this.close();
    }
    // this.selectedSize = false;
  }

  ngOnDestroy() {
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    if (this.id && !this.data) {
      let number: number = +this.id.replace('modal-', '');
      this.productService.getProduct(number).subscribe((data) => {
        this.data = data;
        console.log(data);
      });
    }
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
