import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopify-product',
  templateUrl: './shopify-product.component.html',
  styleUrls: ['./shopify-product.component.scss']
})
export class ShopifyProductComponent implements OnInit {

  constructor(public params: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
