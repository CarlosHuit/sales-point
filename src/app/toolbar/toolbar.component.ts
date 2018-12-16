import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title: string;
  @Output() evsMenu = new EventEmitter<boolean>();

  constructor(
    private _router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  isLoggedIn = () => {

    return this.authService.isLoggedIn();

  }

  logout = () => {
    return this.authService.logout();
  }

  fullName = () => {
    return this.authService.currentUser.fullName().toString();
  }

  toggleLateralBar = () => {
    this.evsMenu.emit(true);
  }

  goToDashBoard() {
    this._router.navigateByUrl('');
  }

}
