import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-all-results',
  templateUrl: './all-results.component.html',
  styleUrls: ['./all-results.component.scss'],
})
export class AllResultsComponent {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productCacheService: CacheService
  ) {}
  waitingForData: boolean = true;
  products: any;
  page = 1;
  pages!: number[];
  sortBy = 'id';
  foundResults!: any;
  limit: any = 36;

  private cache = new Map<string, any>(); // Map to store cached product data

  filterBy(e: any) {
    this.waitingForData = true;
    console.log('PLACEHOLDER MIS');
    this.sortBy = e.target.value;
    console.log(this.sortBy);
    this.fetchProducts();
  }

  changePage(newPage: number) {
    this.waitingForData = true;
    console.log('PLACEHOLDER MIS');
    this.page = newPage;
    this.fetchProducts();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // scroll to top smoothly
  }

  handleProductData(data: any) {
    console.log('PLACEHOLDER ENLEVE');
    this.waitingForData = false;
    if (!data.results) {
      this.products = [];
      console.log('nothing found');
      return;
    }
    this.products = data.results;
    this.foundResults = data.numberResults;
    this.pages = Array.from({ length: data.pages }, (e, i) => i + 1);

    const category: string | null =
      this.route.snapshot.paramMap.get('category');
    const genre: string | null = this.route.snapshot.paramMap.get('genre');
    const term: string | null = this.route.snapshot.paramMap.get('term');
    this.productCacheService.set(
      category,
      genre,
      term,
      this.page,
      this.sortBy,
      data
    );
  }

  fetchProducts() {
    this.route.paramMap.subscribe((params) => {
      const category: string | null = params.get('category');
      const genre: string | null = params.get('genre');
      const term: string | null = params.get('term');

      const cachedData = this.productCacheService.get(
        category,
        genre,
        term,
        this.page,
        this.sortBy
      );
      // Check if the product data is already in cache
      if (cachedData) {
        alert('Fetched using cached data');
        this.handleProductData(cachedData);
      } else {
        alert('Fetched using db data');
        // If not, fetch the product data
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
        } else if (category) {
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
      }
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
}
