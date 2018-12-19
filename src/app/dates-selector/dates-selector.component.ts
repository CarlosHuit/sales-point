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
  @Output() evsDatesSelector =          new EventEmitter<TimeInterval>();

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

  search = () => {

    if (this.validation()) {

      const dates = new TimeInterval(this.initialDate, this.finalDate);
      this.evsDatesSelector.emit(dates);

    }

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

}
