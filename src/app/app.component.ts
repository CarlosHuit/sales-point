import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { DetectMobileService } from './services/detect-mobile/detect-mobile.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mobileQuery: MediaQueryList;
  show:        boolean;
  title        = 'dashboard';
  private _mobileQueryListener: () => void;

  constructor(
    public  changeDetectorRef:  ChangeDetectorRef,
    public  media:              MediaMatcher,
    private authService:        AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 864px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  toggleMenu = (ev) => {
    this.show = !this.show;
  }

  closeMatDrawer = (event) => {
    if (this.mobileQuery.matches) {
      this.show = false;
    }
  }

  isLoggedIn = () => {

    return this.authService.isLoggedIn();

  }

}
