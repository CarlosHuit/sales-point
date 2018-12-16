import { User } from './user';
import { Product } from './product';
import { Client } from './client';

export class Order {
  constructor(
    public user:     User | string,
    public client:   Client | string,
    public date:     Date,
    public articles: Article[]
  ) {}
}

export class Article {
  constructor(
    public product:  Product | string,
    public quantity: number,
    public date:     Date,
  ) {}
}
