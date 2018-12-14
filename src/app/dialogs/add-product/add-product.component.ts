import { Component    } from '@angular/core';
import { MatDialogRef } from '@angular/material';

class Product {
  constructor(
    public code:        string,
    public sku:         string,
    public description: string,
  ) {}
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  products = [
    new Product('1010', '14585', 'DETERGENTE BLANCA NIEVES BOLSA 250 GRS.'),
    new Product('1011', '12810', 'ACEITE PATRONA BOTELLITA 175 ML.'       ),
    new Product('1012', '16588', 'SALSA NATURAS RANCHERA SOBRE 106 GRS.'  ),
  ];

  product: {};

  constructor(
    public  dialogRef: MatDialogRef<AddProductComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  search = (value: string) => {

    const code   = value.trim();
    this.product = this.findByCodeOrSku(code);


  }

  findByCodeOrSku = (code: string) => {

    const iBarCode = this.products.findIndex(product => product.code === code);
    const iSkuCode = this.products.findIndex(product => product.sku === code);

    if (iBarCode !== -1) {

      return this.products[iBarCode];

    } else if (iSkuCode !== -1) {

      return this.products[iSkuCode];

    }

  }


}

