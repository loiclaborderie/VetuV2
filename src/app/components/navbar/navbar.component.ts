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
import { fromEvent, map, throttleTime } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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
  menuOpened = false;
  categories = [
    {
      categorie: 'tshirts',
      public: 'm',
    },
    {
      categorie: 'tshirts',
      public: 'f',
    },
    {
      categorie: 'jeans',
      public: 'm',
    },
    {
      categorie: 'costumes',
      public: 'f',
    },
    {
      categorie: 'costumes',
      public: 'm',
    },
    {
      categorie: 'jeans',
      public: 'f',
    },
    {
      categorie: 'tshirts',
      public: 'mixte',
    },
    {
      categorie: 't-shirt',
      public: 'mixte',
    },
    {
      categorie: 'jeans',
      public: 'h',
    },
  ];

  constructor(
    // @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private cartService: CartService
  ) {}
  @ViewChild('headerNav') headerNav!: ElementRef;
  @ViewChildren('dropdownContainer') dropdownContainers!: QueryList<ElementRef>;

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

  @HostListener('window:DOMContentLoaded')
  onDomContentLoaded() {
    let header = this.headerNav.nativeElement as HTMLElement;
    console.log(header);
    let headerHauteur = header.offsetHeight;
    console.log(headerHauteur);
    this.headerHeight = headerHauteur;
    console.log(this.headerHeight);
    document.body.style.paddingTop = this.headerHeight + 'px';
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
    if (this.menuOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  ngOnInit(): void {
    console.log(this.headerHeight);
    // let header = document.querySelector('header.header') as HTMLElement;
    // console.log(header);
    // let headerHeight = header.getBoundingClientRect().height;
    this.updateCount();

    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(250),
        map(() => window.scrollY, console.log(window))
      )
      .subscribe((scroll) => {
        if (scroll > this.lastScrollTop && scroll > this.headerHeight) {
          this.scrolldown = true;
          console.log('scrolling down');
        } else {
          this.scrolldown = false;
          console.log('scrolling up');
        }
        this.lastScrollTop = scroll;
        console.log(this.scrolldown);
      });
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
