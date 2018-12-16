import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../classes/product';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  code: string;
  product: Product;
  loading: boolean;

  constructor(private _product: ProductsService, private _auth: AuthService) { }

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
      console.log(res);
      this.loading = false;
    }, 1000);
  }

  handleError = (err) => {
    setTimeout(() => {
      this._auth.showError(err);
      this.loading = false;
    }, 1000);
  }

}
