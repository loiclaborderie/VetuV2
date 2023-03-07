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

  filterBy(e: any) {
    this.filterValue = e.target.value;
    this.filter(this.filterValue);
  }

  filter(by: string) {
    switch (by) {
      case 'desc_price':
        this.products = this.products.sort((a: any, b: any) => b.prix - a.prix);
        break;
      case 'asc_price':
        this.products = this.products.sort((a: any, b: any) => a.prix - b.prix);
        break;
      case 'desc_rate':
        this.products = this.products.sort((a: any, b: any) => b.note - a.note);
        break;
      case 'asc_rate':
        this.products = this.products.sort((a: any, b: any) => a.note - b.note);
        break;
      default:
        this.products = this.products.sort((a: any, b: any) => a.id - b.id);
        break;
    }
  }

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
