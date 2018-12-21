import { Product } from './product';
import { User } from './user';

export class Devolution {
  constructor(
    public product:         Product | string,
    public quantity:        number,
    public observation:     string,
    public registerBy:      User    | string,
    public dateDevolution:  Date
  ) {}
}
