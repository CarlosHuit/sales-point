import { User } from './user';

export class Product {
  constructor(
    public registerBy:  User | string , // User Id | User populate
    public barcode:     string,
    public sku:         number,
    public description: string,
  ) {}
}
