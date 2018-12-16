import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  @Input() total: number;
  @Output() evsClose = new EventEmitter<boolean>();
  @Output() evsPay   = new EventEmitter<{date: Date, received: number}>();

  constructor() { }

  ngOnInit() {
  }

  in = () => {};

  cancel = () => {
    this.evsClose.emit(true);
  }

  bill = (el: HTMLInputElement) => {

    const val = el.value.trim();
    if (val.length > 0) {
      const t = parseFloat(val);
      const x = {date: new Date(), received: t};
      this.evsPay.emit(x);
    }

  }

}
