import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router            } from '@angular/router';
import { environment       } from '../../../environments/environment';
import { GetTokenService   } from '../get-token/get-token.service';
import { catchError, map, retry   } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { AuthService       } from '../../auth/auth.service';
import urljoin from 'url-join';
import { Provider } from '../../classes/providers';
import { StorageService } from '../storage/storage.service';
import { Client } from '../../classes/client';

@Injectable({
  providedIn: 'root'
})
  export class ProvidersService {

  apiUrl:      string;
  httpOptions: any;

  constructor(
    private http: HttpClient,
    private _auth: AuthService,
    private _router: Router,
    private getToken: GetTokenService,
    private _storage: StorageService
  ) {

    this.apiUrl = urljoin(environment.apiUrl, 'providers');

  }



  saveProvider = (provider: Provider) => {

    const url = urljoin(this.apiUrl, provider.registerBy);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };
    const data = JSON.stringify(provider);

    return this.http.post(url, data, this.httpOptions )
      .pipe(
        catchError( this.handleError )
      );
  }




  updateProvider = (provider: Provider) => {

    const url = urljoin(this.apiUrl, provider._id);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };
    const data = JSON.stringify(provider);

    return this.http.put(url, data, this.httpOptions )
      .pipe(
        catchError( this.handleError )
      );
  }


  getProviders = (): Observable<Provider[]> => {

    const providers = this._storage.getElement('providers');

    if ( providers ) {
      console.log('-- Storage --');
      return this.getStorageProviders();
    }

    if ( !providers ) {
      console.log('-- Server --');
      return this.getServerProviders();
    }


  }


  getServerProviders = (): Observable<Provider[] | any> => {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };

    return this.http.get<Provider[]>(this.apiUrl, this.httpOptions )
      .pipe(
        map( this.saveProvidersOnStorage ),
        catchError( this.handleError )
      );
  }


  getStorageProviders = (): Observable<Provider[]> => {

    const providers = this._storage.getElement('providers');
    return of(providers);

  }


  saveProvidersOnStorage = ( x: any ) => {


    const clients = x as Provider[];

    clients.sort( (a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
    this._storage.saveElement('providers', clients);

    return clients;

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


      return throwError('Ha ocurrido un error');

    }

  }



}
