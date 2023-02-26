import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAddressComponent } from './tab-address.component';

describe('TabAddressComponent', () => {
  let component: TabAddressComponent;
  let fixture: ComponentFixture<TabAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
