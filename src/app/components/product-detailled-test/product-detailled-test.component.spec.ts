import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailledTestComponent } from './product-detailled-test.component';

describe('ProductDetailledTestComponent', () => {
  let component: ProductDetailledTestComponent;
  let fixture: ComponentFixture<ProductDetailledTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailledTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailledTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
