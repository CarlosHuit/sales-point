import {Component, ViewChild, OnInit} from '@angular/core';
import { DateAdapter, MatDatepicker, MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})

export class OrdersComponent implements OnInit {

  initialDate = new Date;
  finalDate =   new Date;
  maxFinalDate = new Date();
  maxInitalDate = new Date(new Date().getTime() - 86400000);

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;


  constructor(private adapter: DateAdapter<any>) {
    const day = 1000 * 60 * 60 * 24;
    const today = new Date(new Date().getTime() - 86400000);
  }

  ngOnInit () {
  }

  french() {
    this.adapter.setLocale('fr');
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value['_d']);
  }

}
