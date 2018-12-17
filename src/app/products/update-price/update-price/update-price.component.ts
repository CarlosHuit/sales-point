import { Component, OnInit } from '@angular/core';
import { Product } from '../../../classes/product';
import { ProductsService } from '../../../services/products/products.service';
import { AuthService } from '../../../auth/auth.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Price } from '../../../classes/price';
import { PricesService } from '../../../services/prices/prices.service';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.css']
})
export class UpdatePriceComponent implements OnInit {

  code: string;
  product: Product;
  loading: boolean;
  updating: boolean;

  constructor(
    private _product: ProductsService,
    private _auth: AuthService,
    private _storage: StorageService,
    private _price: PricesService
    ) { }

  ngOnInit() { }

  searchProduct = () => {
    const code = this.code.trim();
    delete(this.product);

    if (code.length > 0) {
      this.loading = true;
      this._product.searchProduct(code)
        .subscribe(
          this.handleReqSuccess,
          this.handleError
        );
    }
  }

  handleReqSuccess = (res: Product) => {
    setTimeout(() => {
      this.product = res;
      this.loading = false;
    }, 1000);
  }

  handleError = (err) => {
    setTimeout(() => {
      this._auth.showError(err);
      this.loading = false;
    }, 1000);
  }

  updatePriceSale = (cp: HTMLInputElement, cs: HTMLInputElement) => {
    const costPrice = parseFloat(cp.value);
    const salesPrice = parseFloat(cs.value);

    if ( costPrice > salesPrice ) {
      this._auth.showError('El PRECIO DE VENTA debe ser mayor al PRECIO COSTO.', 4000);
    }

    if ( costPrice < salesPrice ) {
      this.loading = true;
      const _id = this._storage.getElement('user')['userId'];
      const newPrice = new Price(_id, this.product._id, new Date(), costPrice, salesPrice);

      this._price.updatePrices(newPrice, this.product.price['_id'])
        .subscribe( this.updateSuccess, this.updateError );

    }

  }

  updateSuccess = (res) => {
    this.product.price = res.price;
    this._storage.saveElement(this.product.sku, this.product);
    this._storage.saveElement(this.product.barcode, this.product);

    setTimeout(() => {
      delete(this.product);
      this.loading = false;
      this._auth.showError(res.message);
    }, 1000);
  }

  updateError = (err) => {
    setTimeout(() => {
      this.loading = false;
      this._auth.showError(err);
    }, 1000);
  }

}
