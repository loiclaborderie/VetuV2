import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOrdersComponent } from './tab-orders.component';

describe('TabOrdersComponent', () => {
  let component: TabOrdersComponent;
  let fixture: ComponentFixture<TabOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabOrdersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
