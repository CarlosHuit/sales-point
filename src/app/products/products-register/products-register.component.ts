import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Product } from '../../classes/product';
import { User    } from '../../classes/user';
import { StorageService } from '../../services/storage/storage.service';
import { Price } from 'src/app/classes/price';
import { ProductsService } from '../../services/products/products.service';



@Component({
  selector: 'app-products-register',
  templateUrl: './products-register.component.html',
  styleUrls: ['./products-register.component.css']
})
export class ProductsRegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean;

  constructor(
    private fb:           FormBuilder,
    private authService:  AuthService,
    private _router:      Router,
    private _storage:     StorageService,
    private _products:    ProductsService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        'barCode':        ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(100)]],
        'sku':            ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(100)]],
        'description':    ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
        'costPrice':      ['', [Validators.required, Validators.min(.01),      Validators.max(10000)]],
        'salePrice':      ['', [Validators.required, Validators.min(.01),      Validators.max(10000)]],
      }
    );


  }



  onSubmit() {


    if (!this.registerForm.valid) {
      this.authService.showError('Los datos ingresados no son validos. Verifica y vuelve a intentarlo.', 3000);
    }

    if (this.registerForm.valid) {

      const user_id = this._storage.getElement('user')['userId'];

      const { barCode, sku, description, costPrice, salePrice } = this.registerForm.value;

      if (costPrice > salePrice) {
        this.authService.showError('El precio para la venta no puede ser menor al precio costo');
      }

      if ( costPrice < salePrice ) {

        this.loading = true;
        const prod = description.toUpperCase();
        const product = new Product(user_id, barCode, sku, prod );
        const price   = new Price(user_id, null, new Date(), costPrice, salePrice );

        this._products.saveProduct(product, price)
          .subscribe(
            val => this.handleReqSucces(),
            err => this.handleError(err)
          );

      }

    }
  }

  handleReqSucces = () => {
    setTimeout(() => {
      this.registerForm.reset();
      this.authService.showError('Guardado Correctamente');
      this.loading = false;
    }, 1000);
  }
  handleError = (err) => {
    setTimeout(() => {
      this.authService.showError(err);
      this.loading = false;
    }, 1000);
  }

}
