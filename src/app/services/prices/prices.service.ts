import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router            } from '@angular/router';
import { environment       } from '../../../environments/environment';
import { GetTokenService   } from '../get-token/get-token.service';
import { catchError, map, retry   } from 'rxjs/operators';
import { throwError, Observable, of        } from 'rxjs';
import { AuthService       } from '../../auth/auth.service';
import urljoin from 'url-join';
import { Product } from '../../classes/product';
import { Price } from '../../classes/price';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
  export class PricesService {

  apiUrl:      string;
  httpOptions: any;

  constructor(
    private http: HttpClient,
    private _auth: AuthService,
    private _router: Router,
    private getToken: GetTokenService,
    private _storage: StorageService
  ) {

    this.apiUrl = urljoin(environment.apiUrl, 'prices');

  }

  updatePrices = (price: Price, price_id: string) => {

    const url = urljoin( this.apiUrl, price_id);
    const data = JSON.stringify(price);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };

    return this.http.put(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError = (error: HttpErrorResponse) => {
    if (error.status === 401) {

      this._router.navigateByUrl('');
      this._auth.logout();
      this._auth.showError('Inicia sesión con un usuario válido', 2000);

      return throwError('Usuario Invalido');

    } else if (error.status === 404) {
      this._auth.showError(error.error.message);
      return throwError('Ha ocurrido un error');
    } else {

      this._auth.showError(error.error.message);
      return throwError('Ha ocurrido un error');

    }

  }

  handleErr = (error: HttpErrorResponse) => {
    return throwError(error.error.message);
  }


}
