import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import urljoin from 'url-join';
import { catchError, map, retry   } from 'rxjs/operators';
import { throwError, Observable   } from 'rxjs';
import { Router             } from '@angular/router';
import { environment        } from '../../../environments/environment';
import { GetTokenService    } from '../get-token/get-token.service';
import { AuthService        } from '../../auth/auth.service';
import { Product            } from '../../classes/product';
import { StorageService     } from '../storage/storage.service';
import { Existence          } from '../../classes/existence';
import { Devolution         } from '../../classes/devolution';

@Injectable({
  providedIn: 'root'
})
export class DevolutionService {

  apiUrl:      string;
  httpOptions: any;

  constructor(
    private http:     HttpClient,
    private _auth:    AuthService,
    private _router:  Router,
    private getToken: GetTokenService,
    private _storage: StorageService
  ) {

    this.apiUrl = urljoin(environment.apiUrl, 'devolutions');

  }

  saveDevolution = (devolution: Devolution) => {
    const url = urljoin(this.apiUrl, devolution.registerBy);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };

    const data = JSON.stringify(devolution);

    return this.http.post(url, data, this.httpOptions)
      .pipe( catchError(this.handleErr) );
  }

  getInventory = (): Observable<Existence[] | any> => {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };

    return this.http.get<Existence[]>(this.apiUrl, this.httpOptions)
      .pipe( catchError(this.handleErr) );
  }

  queryExistence = (code: string): Observable<Existence | any> => {

    const url = urljoin(this.apiUrl, code);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };

    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError( this.handleErr )
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
