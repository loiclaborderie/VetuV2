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
  ngOnInit(): void {
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
        // this.products = category + genre;
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
        this.productService.getProductsBySearchTerm(term).subscribe((data) => {
          this.products = data;
          console.log(this.products);
        });
        console.log('category');
        // this.products = category;
      } else {
        console.log('nun');
      }
    });
  }
  // this.fetchData(reference);
  // console.log('fetching data');
}
