import { Location, NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

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

  goBack() {
    this.location.back();
  }

  selectSize() {
    this.selectedSize = (
      document.querySelector('select.select') as HTMLSelectElement
    ).value;
  }

  addToCart() {
    const productData = this.products[+this.selectedSize];
    this.selectedSize = '';
    const select = document.querySelector('select.select') as HTMLSelectElement;
    select.selectedIndex = 0;
    let newCart = this.cartService.getCartItems();
    if (localStorage.getItem('user')) {
      // On n'utilise plus le localStorage si l'utilisateur est co
      const content = {
        id: productData.id,
        quantite: 1,
      };
      this.orderService.addProductToDb(content).subscribe((data: any) => {
        if (data[1] === 200) {
          this.cartService.addCartItem(productData);
          Swal.fire({
            text: 'Le produit a été ajouté',
            icon: 'success',
            timer: 1500,
            background: '#040037',
            color: '#F3F3F3',
            showConfirmButton: false,
          });
          this.goBack();
          productData.stock--;
          console.log(productData.stock);
        } else {
          Swal.fire({
            text: "Erreur lors de l'ajout au panier",
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
        }
        console.log(data);
      });
    } else {
      this.cartService.addCartItem(productData);
      let newCart = this.cartService.getCartItems();
      localStorage.setItem('cart', JSON.stringify(newCart));
      productData.stock--;
      Swal.fire({
        text: 'Le produit a été ajouté',
        icon: 'success',
        timer: 1500,
        background: '#040037',
        color: '#F3F3F3',
        showConfirmButton: false,
      });
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
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    const reference: string | null =
      this.route.snapshot.paramMap.get('reference');
    this.fetchData(reference);
    // console.log('fetching data');
  }
}
