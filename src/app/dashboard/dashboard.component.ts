import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { DetectMobileService } from '../services/detect-mobile/detect-mobile.service';
import { ProductsService } from '../services/products/products.service';

class ItemOpt  {
  constructor(
    public title: string,
    public img:   string,
    public url:   string,
    public size:  { w: number, h: number }
  ) {}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  title = 'dashboard';
  private _mobileQueryListener: () => void;
  cards = [
    new ItemOpt( 'Ventas',       'sale',       'sales/register',       {w: 215, h: 215 } ),
    new ItemOpt( 'Compras',      'purchase',   'purchases/register',   {w: 205, h: 205 } ),
    new ItemOpt( 'Devoluciones', 'devolution', 'devolutions/register', {w: 195, h: 195 } ),
  ];

  show: boolean;

  constructor(
    private _router: Router,
    public  changeDetectorRef:  ChangeDetectorRef,
    public  media:              MediaMatcher,
    private _mobile:            DetectMobileService,
    private _product:           ProductsService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 864px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this._product.getProducts()
    .subscribe(
      val => {},
      err => {}
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  genUrl = (img) => `/assets/img/${img}.png`;

  redirect = (word: string) => {
    const url = `/${word}`;
    this._router.navigateByUrl(url);
  }

  toggleMenu = (ev) => {
    this.show = !this.show;
  }

}
