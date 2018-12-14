import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../classes/user';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.component.html',
  styleUrls: ['./sales-register.component.css']
})
export class SalesRegisterComponent implements OnInit {

  signinForm: FormGroup;
  imgUrl: string;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'client':   new    FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),

    });
  }

  insert = () => {
    const t = {position: 11, name: 'Carlos', weight: 1.0, symbol: 'HP'};
    const x = [...this.dataSource];

    x.unshift(t);
    this.dataSource = x;

  }

  onSubmit() {


    if (!this.signinForm.valid) {
      this.authService.showError('Los datos ingresados no son válidos. Verifica y vuelve a intentarlo.');
    }

    if (this.signinForm.valid) {

      const { email, password } = this.signinForm.value;
      console.log(email, password);
      // const user = new User(email, password);

      // this.authService.signin(user)
      //   .subscribe(
      //     this.authService.login,
      //     this.authService.handleError
      //   );
    }
  }

}
