import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { DetectMobileService } from '../services/detect-mobile/detect-mobile.service';

export interface Section {
  name: string;
  updated: Date;
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
    {
      title: 'Ventas',
      img:   'sale',
      url:   'ventas',
      size: {w: 215, h: 215 }
    },
    {
      title: 'Compras',
      img:   'purchase',
      url:   'compras',
      size: {w: 205, h: 205 }
    },
    {
      title: 'Devoluciones',
      img:   'devolution',
      url:   'devoluciones',
      size: {w: 195, h: 195 }
    }
  ];

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  show: boolean;

  constructor(
    private _router: Router,
    public  changeDetectorRef:  ChangeDetectorRef,
    public  media:              MediaMatcher,
    private _mobile: DetectMobileService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 864px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  genUrl = (img) => `/assets/img/${img}.png`;

  redirect = (word: string) => {
    const url = `/${word}`;
    console.log(url);
    this._router.navigateByUrl(url);
  }

  toggleMenu = (ev) => {
    this.show = !this.show;
    console.log(this.show);
  }

}
