import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-detailled',
  templateUrl: './product-detailled.component.html',
  styleUrls: ['./product-detailled.component.scss'],
})
export class ProductDetailledComponent {
  products: any;
  product: any;
  slideIndex = 1;
  selectedSize: string = '';

  selectSize() {
    this.selectedSize = (
      document.querySelector('select.select') as HTMLSelectElement
    ).value;
  }

  addToCart() {
    const productData = this.products[+this.selectedSize];
    this.cartService.addCartItem(productData);
    this.selectedSize = '';
    let newCart = this.cartService.getCartItems();
    if (localStorage.getItem('user')) {
      // On n'utilise plus le localStorage si l'utilisateur est co
      const content = {
        id: productData.id,
        quantite: 1,
      };
      this.orderService.addLocalCartItemToDb(content).subscribe((data) => {
        console.log(data);
      });
    } else {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  fetchData(reference: string | null) {
    if (reference) {
      this.productService.getProduct(+reference).subscribe((data) => {
        this.products = data;
        this.product = data[0];
      });
    } else {
      this.router.navigate(['/products']);
    }
  }

  plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n: number) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n: NumberSymbol) {
    let slides: HTMLCollectionOf<Element> =
      document.getElementsByClassName('mySlides');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
  }

  constructor(
    private router: Router,
    private productService: ProductService,
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const reference: string | null =
      this.route.snapshot.paramMap.get('reference');
    this.fetchData(reference);
  }
}
