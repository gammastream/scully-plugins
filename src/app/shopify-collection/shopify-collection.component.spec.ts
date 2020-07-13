import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyCollectionComponent } from './shopify-collection.component';

describe('ShopifyCollectionComponent', () => {
  let component: ShopifyCollectionComponent;
  let fixture: ComponentFixture<ShopifyCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopifyCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
