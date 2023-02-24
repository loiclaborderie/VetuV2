import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent {
  products: any;

  constructor(private productService: ProductService) {}

  // Le local storage à garder seulement en dev car il permet de garder les données en mémoire, et de ne pas les recharger à chaque fois
  ngOnInit(): void {
    const cachedProducts = localStorage.getItem('products');

    if (cachedProducts) {
      this.products = JSON.parse(cachedProducts);
    } else {
      this.fetchProducts();
    }
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
      localStorage.setItem('products', JSON.stringify(data));
    });
  }

  console() {
    console.log(this.products);
  }
}
