import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../classes/user';
import { MatDialog } from '@angular/material';
import { AddProductComponent } from '../../dialogs/add-product/add-product.component';


export class PeriodicElement {
  constructor(
    public sku:         number,
    public description: string,
    public quantity:    number,
    public total:       string,

  ) {}
}


@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.component.html',
  styleUrls: ['./sales-register.component.css']
})
export class SalesRegisterComponent implements OnInit {

  signinForm: FormGroup;
  imgUrl: string;

  displayedColumns: string[] = ['sku', 'description', 'quantity', 'total'];

  dataSource = [
  ];


  clients = [
    'carlos',
    'manuel'
  ];

  total = 200.00;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'client':   new    FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),

    });
  }

  insert = () => {
    const t = {position: 11, name: 'Carlos', weight: 1.0, symbol: 'HP'};
    const x = [...this.dataSource];

    // x.unshift(t);
    this.dataSource = x;

  }

  openDialog = (id: string) => {

    const dialogRef = this.dialog.open( AddProductComponent, { disableClose: false });

    dialogRef.afterClosed()
      .subscribe(
        (ev) => ev !== undefined ? this.addProd(ev) : null
      );

  }

  addProd = (prod) => {
    console.log(prod);
    const x = [...this.dataSource];
    const el = new PeriodicElement(prod.sku, prod.description, prod.quantity, prod.total );

    x.push(el);
    this.dataSource = x;
  }

  genTotal = () => {
    return this.dataSource.map(p => p.total).reduce((acc, val) => acc + val, 0);
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
