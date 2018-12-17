import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { AuthService } from '../../../auth/auth.service';
import { Product } from 'src/app/classes/product';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  loading = false;
  product: Product;
  constructor(
    private _product: ProductsService,
    private _auth:    AuthService,
    private _storage: StorageService
  ) { }

  ngOnInit() {
  }

  searchProduct = (el: HTMLInputElement) => {

    const code = el.value.toLowerCase().trim();

    if (code.length > 0) {

      delete( this.product);
      this.loading = true;
      this._product.searchProduct(code)
        .subscribe(
          val => this.handleResponse(val, el),
          err => this.handleError(err, el)
        );

      } else {

        this._auth.showError('Ingresa un SKU');

      }

  }

  handleError = (error, el: HTMLInputElement) => {
    setTimeout(() => {
      el.value = '';
      el.focus();
      this.loading = false;
    }, 1000);
  }

  handleResponse = (product: Product, el: HTMLInputElement) => {
    setTimeout(() => {
      el.value = '';
      this.product = product;
      this.loading = false;
    }, 1000);
  }

  notLoading = () => {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  update = (product: Product) => {
    this.loading = true;
    delete(this.product);

    this._product.updateProduct(product)
      .subscribe(
        val => this.updateHandleRes(val),
        err => this.updateHandleErr(err)
      );
  }

  updateHandleRes = (product) => {
    setTimeout(() => {
      this._storage.saveElement(product['sku'], product);
      this._storage.saveElement(product['barcode'], product);
      this.loading = false;
      this._auth.showError('Producto actualizado');
    }, 1000);
  }

  updateHandleErr = (err) => {
    setTimeout(() => {
      this.loading = false;
      this._auth.showError('Error al actualizar');
    }, 1000);
  }

}
