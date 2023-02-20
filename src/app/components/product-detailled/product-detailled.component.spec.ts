import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailledComponent } from './product-detailled.component';

describe('ProductDetailledComponent', () => {
  let component: ProductDetailledComponent;
  let fixture: ComponentFixture<ProductDetailledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
