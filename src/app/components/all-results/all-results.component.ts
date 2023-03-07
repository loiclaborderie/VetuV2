import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-all-results',
  templateUrl: './all-results.component.html',
  styleUrls: ['./all-results.component.scss'],
})
export class AllResultsComponent {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  products: any;
  page = 1;
  pages!: number[];
  sortBy = 'id';
  foundResults!: any;
  limit: any = 36;

  filterBy(e: any) {
    this.sortBy = e.target.value;
    console.log(this.sortBy);
    this.fetchProducts();
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.fetchProducts();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // scroll to top smoothly
  }

  handleProductData(data: any) {
    if (!data.results) {
      this.products = [];
      console.log('nothing found');
      return;
    }
    this.products = data.results;
    this.foundResults = data.numberResults;
    this.pages = Array.from({ length: data.pages }, (e, i) => i + 1);
  }

  fetchProducts() {
    this.route.paramMap.subscribe((params) => {
      const category: string | null = params.get('category');
      const genre: string | null = params.get('genre');
      const term: string | null = params.get('term');
      if (genre && category) {
        this.productService
          .getProductsByCategoryAndGenre(
            category,
            genre,
            this.page,
            this.sortBy
          )
          .subscribe((data: any) => {
            this.handleProductData(data);
          });
        console.log('genre and category');
      }
      // else if (genre) {
      //   console.log('genre');
      //   this.products = genre;
      // }
      else if (category) {
        this.productService
          .getProductsByCategory(category, this.page, this.sortBy)
          .subscribe((data: any) => {
            this.handleProductData(data);
          });
        console.log('category');
      } else if (term) {
        this.productService
          .getProductsBySearchTerm(term, this.page, this.sortBy)
          .subscribe((data: any) => {
            this.handleProductData(data);
          });
        console.log('search');
      } else {
        console.log('no param');
        this.productService
          .getProducts(this.page, this.sortBy)
          .subscribe((data: any) => {
            this.handleProductData(data);
          });
      }
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
}
