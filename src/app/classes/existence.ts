import { Product } from './product';
import { Order } from './order';



export class Transactions {
  constructor(
    public order:           Order,
    public quantity:        number,
    public typeTransaction: string,
  ) {}
}

export class Existence {
  constructor(
    public product:       Product,
    public existences:    number,
    public transactions:  Transactions,
  ) {}
}
