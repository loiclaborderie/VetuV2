import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { fromEvent, map, auditTime } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('cartItemCount', [
      state(
        'active',
        style({
          transform: 'scale(1.8)',
          backgroundColor: '#040037',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'scale(1.15)',
        })
      ),
      transition('inactive => active', animate('0.01s linear')),
      transition('active => inactive', animate('0.4s ease-out')),
    ]),
  ],
})
export class NavbarComponent {
  scrolldown = false;
  lastScrollTop: number = Infinity;
  title = 'vetu';
  countItems = 0;
  currentItemCount: number = 0;
  prevItemCount: number = 0;
  animationState: string = 'inactive'; // Add this line
  headerHeight!: any;
  menuOpened!: boolean;
  categories: any[] = [];
  scrollEvent: any;
  clicked = false;

  constructor(
    // @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.productService.getAllCategories().subscribe((data) => {
      this.categories = data;
      console.log(data);
    });
  }
  @ViewChild('headerNav') headerNav!: ElementRef;
  @ViewChildren('dropdownContainer') dropdownContainers!: QueryList<ElementRef>;

  click() {
    if (this.clicked) {
      let search = document.querySelector(
        'input.search__input'
      ) as HTMLInputElement;
      console.log(search.value);
      if (search.value) {
        if (search.value.length > 2) {
          this.router.navigate(['/products/search/' + search.value]);
          search.value = '';
          this.clicked = false;
        } else {
          console.log('la requete est trop courte');
        }
      }
    } else {
      this.clicked = true;
      console.log('clicked');
    }
  }
  unclick() {
    let searchInput = document.querySelector(
      '.search__input'
    ) as HTMLInputElement;
    searchInput.value = '';
    this.clicked = false;
    console.log('unclicked');
  }

  toggleDropdown(i: number) {
    const dropdownContainer =
      this.dropdownContainers.toArray()[i].nativeElement;
    const background = document.querySelector('#bg-image') as HTMLElement;
    console.log(dropdownContainer);
    if (
      dropdownContainer.style.display === 'none' ||
      dropdownContainer.style.display === ''
    ) {
      dropdownContainer.style.display = 'flex';
      background.classList.add('active');
    } else {
      dropdownContainer.style.display = 'none';
      background.classList.remove('active');
    }
  }

  ngAfterViewInit(): void {
    let header = this.headerNav.nativeElement as HTMLElement;
    console.log(header);
    let headerHauteur = header.offsetHeight;
    console.log(headerHauteur);
    this.headerHeight = headerHauteur || 80;
    console.log(this.headerHeight);
    document.body.style.paddingTop = this.headerHeight + 'px';
  }

  test() {
    let search = document.querySelector(
      'input.search-desktop'
    ) as HTMLInputElement;
    console.log(search.value);
    if (search.value) {
      if (search.value.length > 2) {
        this.router.navigate(['/products/search/' + search.value]);
        search.value = '';
      } else {
        console.log('la requete est trop courte');
      }
    }
  }

  toggleMenu() {
    if (this.menuOpened === null || this.menuOpened === undefined) {
      this.menuOpened = true;
    } else {
      this.menuOpened = !this.menuOpened;
    }
    if (this.menuOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  ngOnInit(): void {
    this.updateCount();

    // check if the page is at the top of the page
    this.scrolldown = window.pageYOffset > 0 ? true : false;

    // create observable for scroll events
    let observable = fromEvent(window, 'scroll').pipe(
      auditTime(250),
      map(() => window.scrollY)
    );

    this.scrollEvent = observable.subscribe((scroll: any) => {
      console.log(scroll, this.lastScrollTop, this.headerHeight);
      if (scroll > this.lastScrollTop) {
        this.scrolldown = true;
        console.log('scrolling down');
      } else if (scroll < this.headerHeight || window.pageYOffset === 0) {
        this.scrolldown = false;
      } else {
        this.scrolldown = false;
        console.log('scrolling up');
      }
      this.lastScrollTop = scroll;
      console.log(this.scrolldown);
    });
  }

  ngOnDestroy(): void {
    if (this.scrollEvent) {
      this.scrollEvent.unsubscribe();
    }
    this.lastScrollTop = Infinity;
    document.body.style.paddingTop = '0px';
  }

  consoleNum() {
    console.log(this.countItems);
  }
  updateCount() {
    this.countItems = this.cartService.getCountItems();
  }

  ngDoCheck() {
    this.updateCount();
    if (this.currentItemCount !== this.countItems) {
      this.prevItemCount = this.currentItemCount;
      this.currentItemCount = this.countItems;
      this.animationState = 'active';
      setTimeout(() => (this.animationState = 'inactive'), 200);
    }
  }

  backToMenu() {
    this.router.navigate(['/products']);
  }

  goToPanier() {
    this.router.navigate(['/cart']);
  }
}
