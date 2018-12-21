import { User } from './user';
import { Price } from './price';

export class Product {
  constructor(
    public registerBy:  User | string , // User Id | User populate
    public barcode:     string,
    public sku:         string,
    public description: string,
    public price?:      Price | any | number,
    public quantity?:   number,
    public _id?: string,
  ) { }

  subTotal () {
    return this.quantity * this.price['salesPrice'];
  }

  subTotalCost () {
    return this.quantity * this.price['costPrice'];
  }

}
