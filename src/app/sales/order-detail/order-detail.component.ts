import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../classes/order';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})

export class OrderDetailComponent implements OnInit {

  @Input()  order:               Order;
  @Output() evCloseOrderDetail = new EventEmitter<boolean>();

  hideSheet: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.order.billedBy);
  }

  billedBy = () => {
    const t: User = this.order.billedBy as User;
    return `${t.firstName} ${t.lastName}`;
  }

  close = () => {
    this.hideSheet = true;
    setTimeout(() => this.evCloseOrderDetail.emit(true), 280);
  }

}
