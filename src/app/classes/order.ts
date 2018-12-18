import { User } from './user';
import { Product } from './product';
import { Client } from './client';

export class Order {
  constructor(
    public billedBy:       User | string,
    public client:         Client | string,
    public dateBilled:     Date,
    public articles:       Article[],
    public total?:         number,
    public received?:      number,
    public _id?:           string,
  ) {}
}

export class Article {
  constructor(
    public product:   Product | string,
    public quantity:  number,
    public date:      Date,
    public priceSale: number,
  ) {}
}
