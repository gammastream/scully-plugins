import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopify-collection',
  templateUrl: './shopify-collection.component.html',
  styleUrls: ['./shopify-collection.component.scss']
})
export class ShopifyCollectionComponent implements OnInit {

  constructor(public params: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
