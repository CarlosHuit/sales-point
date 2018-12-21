import {Component, ViewChild, OnInit} from '@angular/core';
import { TimeInterval  } from '../../classes/time-interval';
import { OrdersService } from '../../services/orders/orders.service';
import { AuthService   } from '../../auth/auth.service';
import { Order } from '../../classes/order';
import { Router } from '@angular/router';
import { PurchasesService } from '../../services/purchases/purchases.service';
import { Purchase } from '../../classes/purchase';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  loadingSales: boolean;
  timeInterval: TimeInterval;
  purchase:     Purchase;
  purchases:    Purchase[];

  constructor(
    private _orders:    OrdersService,
    private _auth:      AuthService,
    private _router:    Router,
    private _purchases: PurchasesService
  ) { }

  ngOnInit () { }


  searchByInterval = (dates: TimeInterval) => {
    this.loadingSales = true;
    this.timeInterval = dates;

    this._purchases.getPurchases(dates)
      .subscribe(
        this.getPurchasesSucces,
        this.getPurchasesError
      );
  }

  getPurchasesSucces = (res: any) => {
    setTimeout(() => {

      if (res.purchases.length > 0) {
        this.purchases = res.purchases;
        this.loadingSales = false;
      }

      if (res.purchases.length === 0) {
        this.loadingSales = false;
        this._auth.showError(res.message);
      }

    }, 1000);
  }

  getPurchasesError = (err: string) => {
    setTimeout(
      () => (this.loadingSales = false, this._auth.showError(err)),
      1000
    );
  }


  showDetail = (id: string) => {
    const index = this.purchases.findIndex(order => order._id === id);
    const el = this.purchases[index];
    this.purchase = el;
  }

  closeOrderDetail = () => {
    delete(this.purchase);
  }

  restart = () => {
    delete(this.purchases);
  }

}
