import { User } from './user';
import { Product } from './product';


export class Price {
  constructor(
    public changedBy:   User| string,
    public product:     Product | string,
    public date:        Date,
    public costPrice:   number,
    public salesPrice:  number,
  ) {}
}
