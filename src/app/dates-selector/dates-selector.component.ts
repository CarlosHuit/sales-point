import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DateAdapter, MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dates-selector',
  templateUrl: './dates-selector.component.html',
  styleUrls: ['./dates-selector.component.css']
})
export class DatesSelectorComponent implements OnInit, OnDestroy {

  initialDate:    Date;
  finalDate:      Date;
  maxFinalDate  = new Date();
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

  addInitialDate = (event: MatDatepickerInputEvent<Date>) => {
    this.initialDate = event.value['_d'];
  }

  addFinalDate = (event: MatDatepickerInputEvent<Date>) => {
    this.finalDate = event.value['_d'];
  }

}
