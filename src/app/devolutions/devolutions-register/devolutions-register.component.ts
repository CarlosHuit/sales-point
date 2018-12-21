import { Component, OnInit } from '@angular/core';
import { ProductsService   } from '../../services/products/products.service';
import { Product           } from '../../classes/product';
import { AuthService       } from '../../auth/auth.service';
import { Devolution        } from '../../classes/devolution';
import { DevolutionService } from '../../services/devolution/devolution.service';
import { StorageService    } from '../../services/storage/storage.service';


@Component({
  selector: 'app-devolutions-register',
  templateUrl: './devolutions-register.component.html',
  styleUrls: ['./devolutions-register.component.css']
})
export class DevolutionsRegisterComponent implements OnInit {

  code: string;
  product: Product | any;
  loading: boolean;

  quantity: number;
  observations: string;

  constructor(
    private _product: ProductsService,
    private _auth: AuthService,
    private _storage: StorageService,
    private _devolutions: DevolutionService
    ) { }

  ngOnInit() {
  }


  searchProduct = () => {
    const code = this.code.trim();
    delete(this.product);

    if (code.length > 0) {
      this.loading = true;
      this._product.searchProduct(code)
        .subscribe(
          this.handleReqSuccess,
          this.handleError
        );
    }
  }

  handleReqSuccess = (res: Product) => {
    setTimeout(() => {
      this.product = res;
      this.loading = false;
    }, 1000);
  }

  handleError = (err) => {
    setTimeout(() => {
      this.loading = false;
      this._auth.showError(err);
    }, 500);
  }

  registerDevolution = () => {
    const user_id = this._storage.getElement('user')['userId'];
    const x = new Devolution(this.product['_id'] , this.quantity, this.observations, user_id, new Date);

    this.loading = true;
    delete(this.product);

    this._devolutions.saveDevolution(x)
      .subscribe(
        this.devolutionRegistered,
        this.devolutionNotRegistered,
      );
  }

  devolutionRegistered = (res: any) => {
    setTimeout(() => {
      this.loading = false;
      this._auth.showError(res.message);
    }, 500);
  }

  devolutionNotRegistered = (err: string) => {
    setTimeout(() => {
      this.loading = false;
      this._auth.showError(err);
    }, 500);
  }

}
