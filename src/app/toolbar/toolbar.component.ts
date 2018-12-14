import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title: string;
  @Output() evsMenu = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggleLateralBar = () => {
    this.evsMenu.emit(true);
  }

}
