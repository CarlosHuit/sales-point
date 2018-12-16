import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../classes/product';
import { Article } from '../../classes/order';


@Component({
  selector: 'app-form-add-product',
  templateUrl: './form-add-product.component.html',
  styleUrls: ['./form-add-product.component.css']
})
export class FormAddProductComponent implements OnInit {

  @Output() evsAddProduct  = new EventEmitter<{product: Product, article: Article}>();
  @Output() evsCloseDialog = new EventEmitter<boolean>();
  product: Product;
  products = [
    new Product(null, '1010', '14585', 'DETERGENTE BLANCA NIEVES BOLSA 250 GRS.', 10, null, '1234567890'),
    new Product(null, '1011', '12810', 'ACEITE PATRONA BOTELLITA 175 ML.',        11, null, '1234567890'),
    new Product(null, '1012', '16588', 'SALSA NATURAS RANCHERA SOBRE 106 GRS.',   12, null, '1234567890'),
  ];
  constructor() { }

  ngOnInit() {
  }

  addProduct = (el: HTMLInputElement) => {



    const product = new Product(
      null,
      this.product.barcode,
      this.product.sku,
      this.product.description,
      this.product.unitPrice,
      this.product.quantity
    );

    const article = new Article(this.product.product_id, this.product.quantity, new Date(), this.product.unitPrice);
    const data = {product, article};

    el.value = '';
    delete(this.product.quantity);
    el.focus();

    this.evsAddProduct.emit(data);
    delete(this.product);

  }

  closeDialog = () => {
    this.evsCloseDialog.emit(true);
  }

  search = (value: string) => {

    const code   = value.trim();
    this.product = this.findByCodeOrSku(code);

  }

  findByCodeOrSku = (code: string) => {

    const iBarCode = this.products.findIndex(product => product.barcode === code);
    const iSkuCode = this.products.findIndex(product => product.sku === code);

    if (iBarCode !== -1) {

      return this.products[iBarCode];

    } else if (iSkuCode !== -1) {

      return this.products[iSkuCode];

    }

  }

  calcSubTotal = () => {

  }

}
