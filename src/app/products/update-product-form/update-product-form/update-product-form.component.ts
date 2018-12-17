import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../classes/product';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.css']
})
export class UpdateProductFormComponent implements OnInit {

  @Input() product: Product;
  @Output() evsUpdateProduct = new EventEmitter<Product>();

  prod: Product;

  constructor() { }

  ngOnInit() {
    this.prod = Object.assign({}, this.product);
  }

  compare = () => {
    const vSku     = this.product.sku === this.prod.sku;
    const vBarcode = this.product.barcode === this.prod.barcode;
    const vDesc    = this.product.description === this.prod.description;

    return vSku && vBarcode && vDesc ? true : false;
  }


  update = () => {
    if ( this.compare ) {
      console.log('update');
      this.evsUpdateProduct.emit(this.prod);
    }
  }


}
