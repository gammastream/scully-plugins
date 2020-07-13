import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { Http404Component } from './http404/http404.component';
import { PageComponent } from './page/page.component';
import { ProductsComponent } from './products/products.component';
import { ShopifyCollectionComponent } from './shopify-collection/shopify-collection.component';
import { ShopifyProductComponent } from './shopify-product/shopify-product.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ProductsComponent,
    ShopifyCollectionComponent,
    ShopifyProductComponent
  ],
  imports: [
    BrowserModule,
    ScullyLibModule,
    RouterModule.forRoot([{
      path: 'a',
      component: PageComponent
    }, {
      path: 'b',
      component: PageComponent
    }, {
      path: 'c',
      component: PageComponent
    }, {
      path: 'shopify-collections/:collectionHandle/:id',
      component: ShopifyCollectionComponent
    }, {
      path: 'shopify-collections/:collectionHandle',
      component: ShopifyCollectionComponent
    }, {
      path: 'shopify-product/:productHandle',
      component: ShopifyProductComponent
    }, {
      path: 'products/:productId',
      component: ProductsComponent
    }, {
      path: '',
      component: PageComponent
    }, {
      path: '404',
      component: Http404Component
    }, {
      path: '**',
      component: Http404Component
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
