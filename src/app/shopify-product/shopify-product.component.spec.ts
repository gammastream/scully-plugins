import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyProductComponent } from './shopify-product.component';

describe('ShopifyProductComponent', () => {
  let component: ShopifyProductComponent;
  let fixture: ComponentFixture<ShopifyProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopifyProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
