import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DateAdapter, MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { TimeInterval } from '../classes/time-interval';
import { AuthService  } from '../auth/auth.service';

@Component({
  selector: 'app-dates-selector',
  templateUrl: './dates-selector.component.html',
  styleUrls: ['./dates-selector.component.css']
})
export class DatesSelectorComponent implements OnInit, OnDestroy {

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  @Output() evSearchByInterval =        new EventEmitter<TimeInterval>();

  initialDate:    Date;
  finalDate:      Date;
  maxFinalDate  = new Date();
  maxInitalDate = new Date(new Date().getTime() - 86400000);

  mobileQuery:          MediaQueryList;
  _mobileQueryListener: () => void;


  constructor(
    private adapter:           DateAdapter<any>,
    public  media:             MediaMatcher,
    public  changeDetectorRef: ChangeDetectorRef,
    private _auth:             AuthService
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

  addInitialDate = (event: MatDatepickerInputEvent<Date>) => {
    this.initialDate = event.value['_d'];
  }

  addFinalDate = (event: MatDatepickerInputEvent<Date>) => {
    this.finalDate = event.value['_d'];
  }

  searchByInterval = () => {

    if (this.validation()) {

      const dates = new TimeInterval( this.transformIData(this.initialDate), this.transformFData(this.finalDate));
      this.evSearchByInterval.emit(dates);

    }

  }

  searchToday = () => {
    const date = new TimeInterval(this.generateIDate(), this.generateFDate());
    this.evSearchByInterval.emit(date);
  }

  validation = () => {

    if ( this.initialDate && this.finalDate ) {

      const iDate = this.initialDate.getTime();
      const fDate = this.finalDate.getTime();

      if (iDate >= fDate) {

        const msg = 'La fecha inicial debe ser MENOR a la fecha final.';
        this._auth.showError(msg, 3000);
        return false;

      } else {
        return true;
      }

    }
  }

  generateIDate = () => {

    const date  = new Date();
    const year  = date.getFullYear();
    const month = date.getMonth() + 1;
    const day   = date.getDate();

    return new Date(`${year}/${month}/${day} 00:00:00`);

  }

  generateFDate = () => {

    const date  = new Date();
    const year  = date.getFullYear();
    const month = date.getMonth() + 1;
    const day   = date.getDate();

    return new Date(`${year}/${month}/${day} 23:59:59`);

  }

  transformIData = (originalDate: Date) => {

    const date  = originalDate;
    const year  = date.getFullYear();
    const month = date.getMonth() + 1;
    const day   = date.getDate();

    return new Date(`${year}/${month}/${day} 00:00:00`);
  }

  transformFData = (originalDate: Date) => {

    const date  = originalDate;
    const year  = date.getFullYear();
    const month = date.getMonth() + 1;
    const day   = date.getDate();

    return new Date(`${year}/${month}/${day} 23:59:59`);
  }



}
