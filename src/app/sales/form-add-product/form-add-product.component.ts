import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../classes/product';
import { Article } from '../../classes/order';
import { ProductsService } from '../../services/products/products.service';
import { StorageService  } from '../../services/storage/storage.service';
import { AuthService     } from '../../auth/auth.service';


@Component({
  selector: 'app-form-add-product',
  templateUrl: './form-add-product.component.html',
  styleUrls: ['./form-add-product.component.css']
})
export class FormAddProductComponent implements OnInit {

  @Output() evsAddProduct  = new EventEmitter<{product: Product, article: Article}>();
  @Output() evsCloseDialog = new EventEmitter<boolean>();
  product: Product;
  constructor(
    private _product: ProductsService,
    private _storage: StorageService,
    private _auth: AuthService
    ) { }

  ngOnInit() {
  }

  addProduct = (el: HTMLInputElement) => {



    const product = new Product(
      null,
      this.product.barcode,
      this.product.sku,
      this.product.description,
      this.product.price,
      this.product.quantity
    );

    const article = new Article(this.product._id, this.product.quantity, new Date(), this.product.price['salesPrice']);
    const data = {product, article};

    el.value = '';
    delete(this.product.quantity);
    el.focus();

    this.evsAddProduct.emit(data);
    delete(this.product);

    this._auth.showError('Producto Agregado', 500);

  }

  closeDialog = () => {
    this.evsCloseDialog.emit(true);
  }

  search = (value: string) => {

    const code   = value.trim();
    this.product = this.findByCodeOrSku(code);

  }

  findByCodeOrSku = (code: string) => {

    const op1 = this._storage.getElement(code);
    if (op1) {
      return op1;
    }

  }

  calcSubTotal = () => {
    for (let i = 0; i < 300; i++) {
      localStorage.setItem(`${i}`, 's');
    }
  }

}

