import { User } from './user';
import { Product } from './product';
import { Provider } from './providers';

export class Purchase {
  constructor(
    public registerBy:     User | string,
    public provider:       Provider | string,
    public purchaseDate:   Date,
    public articles:       Article[],
    public total?:         number,
    public payment?:      number,
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
