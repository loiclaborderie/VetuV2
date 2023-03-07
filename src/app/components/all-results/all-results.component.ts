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
  filterValue!: string;
  page = 1;
  pages!: number[];
  sortBy = 'id';
  foundResults!: any;
  limit: any = 36;
  allProducts: boolean = false;

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

  fetchProducts() {
    this.route.paramMap.subscribe((params) => {
      const category: string | null = params.get('category');
      const genre: string | null = params.get('genre');
      const term: string | null = params.get('term');
      if (genre && category) {
        this.productService
          .getProductsByCategoryAndGenre(category, genre)
          .subscribe((data) => {
            this.products = data;
            console.log(this.products);
          });
        console.log('genre and category');
      }
      // else if (genre) {
      //   console.log('genre');
      //   this.products = genre;
      // }
      else if (category) {
        this.productService
          .getProductsByCategory(category)
          .subscribe((data) => {
            this.products = data;
            console.log(this.products);
          });
        console.log('category');
        // this.products = category;
      } else if (term) {
        this.productService
          .getProductsBySearchTerm(term, this.page, this.sortBy)
          .subscribe((data: any) => {
            console.log(data);
            if (!data.results) {
              this.products = [];
              console.log('nothing found');
              return;
            }
            this.products = data.results;
            this.foundResults = data.numberResults;
            this.limit = data.limit;
            this.pages = Array.from({ length: data.pages }, (e, i) => i + 1);
          });
        console.log('search');
        // this.products = category;
      } else {
        console.log('no param');
        this.productService.getProducts().subscribe((data) => {
          this.products = data;
          console.log(data);
          this.allProducts = true;
        });
      }
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
  // this.fetchData(reference);
  // console.log('fetching data');
}
