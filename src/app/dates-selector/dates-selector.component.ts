import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DateAdapter, MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dates-selector',
  templateUrl: './dates-selector.component.html',
  styleUrls: ['./dates-selector.component.css']
})
export class DatesSelectorComponent implements OnInit, OnDestroy {

  initialDate = new Date;
  finalDate =   new Date;
  maxFinalDate = new Date();
  maxInitalDate = new Date(new Date().getTime() - 86400000);

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  mobileQuery:          MediaQueryList;
  _mobileQueryListener: () => void;


  constructor(
    private adapter: DateAdapter<any>,
    public  media:             MediaMatcher,
    public  changeDetectorRef: ChangeDetectorRef,
    ) {
    this.mobileQuery          = media.matchMedia('(max-width: 420px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit () {
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  french() {
    this.adapter.setLocale('fr');
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value['_d']);
  }

  addInitialDate = (event: MatDatepickerInputEvent<Date>) => {
    console.log(event);
    // console.log(`${typeof(event)}: ${event.value._d}`);
  }

  addFinalDate = (event: MatDatepickerInputEvent<Date>) => {
    // console.log(`${typeof(event)}: ${event}`);
    console.log(event);
  }

}
