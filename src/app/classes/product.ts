import { User } from './user';

export class Product {
  constructor(
    public registerBy:  User | string , // User Id | User populate
    public barcode:     string,
    public sku:         string,
    public description: string,
    public unitPrice?:  number,
    public quantity?:   number,
    // public subTotal?:   number,
  ) { }

  subTotal () {
    return this.quantity * this.unitPrice;
  }

}
