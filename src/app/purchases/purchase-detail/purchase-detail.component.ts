import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../classes/order';
import { User } from '../../classes/user';
import { Purchase } from '../../classes/purchase';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {


  @Input()  purchase:               Purchase | any;
  @Output() evCloseOrderDetail = new EventEmitter<boolean>();

  hideSheet: boolean;

  constructor() { }

  ngOnInit() { }

  billedBy = () => {
    const t: User = this.purchase.registerBy as User;
    return `${t.firstName} ${t.lastName}`;
  }

  close = () => {
    this.hideSheet = true;
    setTimeout(() => this.evCloseOrderDetail.emit(true), 280);
  }

  totalOrder = () => {
    return this.purchase.articles.map(o => o.costPrice * o.quantity)
      .reduce((acc, val) => acc + val, 0);
  }

}
