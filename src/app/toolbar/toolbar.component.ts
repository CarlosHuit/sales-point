import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title: string;
  @Output() evsMenu = new EventEmitter<boolean>();

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  toggleLateralBar = () => {
    this.evsMenu.emit(true);
  }

  goToDashBoard() {
    this._router.navigateByUrl('');
  }

}
