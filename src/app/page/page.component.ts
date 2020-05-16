import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  sub: Subscription;
  route: ScullyRoute;

  constructor(private scullyRoutesServices: ScullyRoutesService) { }

  ngOnInit(): void {
    this.sub = this.scullyRoutesServices.getCurrent().subscribe((route) => {
      this.route = route;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
