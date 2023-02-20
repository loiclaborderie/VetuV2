import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
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
    let select = document.querySelector('select.select');
    console.log(select);
    this.selectedSize = (select as HTMLSelectElement).value;
  }

  buy() {
    this.cartService.addCartItem(this.products[+this.selectedSize]);
    this.selectedSize = '';
  }

  // alert(message: string) {
  //   alert(message);
  // }

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
    let slides = document.getElementsByClassName('mySlides');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = 'block';
  }

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const reference: string | null =
      this.route.snapshot.paramMap.get('reference');
    this.fetchData(reference);
    this.showSlides(this.slideIndex);
  }
}
