import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../classes/product';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.css']
})
export class UpdateProductFormComponent implements OnInit {

  @Input() product: Product;
  @Output() evsUpdate = new EventEmitter<Product>();

  prod: Product;

  constructor() { }

  ngOnInit() {
    this.prod = Object.assign({}, this.product);
  }

  update = () => {
    if (!this.compare()) {
      this.evsUpdate.emit(this.prod);
    }
  }

  compare = () => {
    const vSku     = this.product.sku === this.prod.sku;
    const vBarcode = this.product.barcode === this.prod.barcode;
    const vDesc    = this.product.description === this.prod.description;

    return vSku && vBarcode && vDesc ? true : false;
  }

}
