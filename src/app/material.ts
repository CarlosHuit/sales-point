import { NgModule } from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import {

  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatSnackBarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  MatDividerModule,
  MatSidenavModule,
  MatSelectModule,
  MatDialogModule,
  MatOptionModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSliderModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,

} from '@angular/material';

const modules = [

  MatToolbarModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  MatDividerModule,
  MatSidenavModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSliderModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class MaterialModule { }
