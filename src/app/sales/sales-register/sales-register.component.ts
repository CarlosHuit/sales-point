import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../classes/user';
import { MatDialog } from '@angular/material';
import { AddProductComponent } from '../../dialogs/add-product/add-product.component';
import { Product } from '../../classes/product';


@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.component.html',
  styleUrls: ['./sales-register.component.css']
})
export class SalesRegisterComponent implements OnInit {

  signinForm: FormGroup;
  imgUrl: string;

  columns: string[] = ['Sku', 'Descripción', 'U.', 'Sub total'];
  activeDialog:     boolean;
  dataSource = [];


  constructor(
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'client':   new    FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    });
  }

  insert = () => {
    const t = {position: 11, name: 'Carlos', weight: 1.0, symbol: 'HP'};
    const x = [...this.dataSource];

    this.dataSource = x;

  }

  openDialog = () => {
    this.activeDialog = true;
  }

  closeDialog = (ev) => {
    this.activeDialog = false;
  }

  addProduct = (prod: Product) => {
    this.dataSource.push(prod);
  }

  genTotal = () => {
    return this.dataSource.map(p => p.subTotal()).reduce((acc, val) => acc + val, 0);
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


/*

------> Orders <-----
{
  user_id: user_id,
  client:  client_id,
  date:    new Date(),
  articles: [
    {
      product_id: product_id,
      quantity:   number,
      price:      string
    }

  ]
}




*/
