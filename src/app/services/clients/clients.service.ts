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
import { Client } from '../../classes/client';

@Injectable({
  providedIn: 'root'
})
  export class ClientsService {

  apiUrl:      string;
  httpOptions: any;

  constructor(
    private http: HttpClient,
    private _auth: AuthService,
    private _router: Router,
    private getToken: GetTokenService,
    private _storage: StorageService
  ) {

    this.apiUrl = urljoin(environment.apiUrl, 'clients');

  }

  getClients = (): Observable<Client[] | any> => {

    const clients = this._storage.getElement('clients');

    if (clients) {
      console.log('storage');
      return this.getClientsOfStorage();
    }

    if (!clients) {
      console.log('server ');
      return this.getClientesOfServer();
    }

  }

  getClientesOfServer = (): Observable<Client[] | any> => {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };

    return this.http.get<Client[]>(this.apiUrl, this.httpOptions)
      .pipe(
        map( this.saveClientsOnStorage ),
        catchError(this.handleError)
      );
  }

  saveClientsOnStorage = ( x: any ) => {


    const clients = x as Client[];

    clients.forEach( c => c.name = `${c.name[0].toUpperCase()}${c.name.slice(1)}` );
    clients.sort( (a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
    this._storage.saveElement('clients', clients);

    return clients;

  }

  getClientsOfStorage = (): Observable<Client[]> => {
    const clients = this._storage.getElement('clients');
    return of(clients);
  }

  updateClient = (client: Client) => {
    const url = urljoin(this.apiUrl, client._id);
    const data = JSON.stringify(client);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };

    return this.http.put(url, data, this.httpOptions)
      .pipe( catchError(this.handleError) );
  }

  saveClient = (client: Client) => {
    const _id = this._storage.getElement('user')['userId'];
    const url = urljoin(this.apiUrl, _id);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${this.getToken.addToken()}`
      })
    };
    const data = JSON.stringify(client);

    return this.http.post(url, data, this.httpOptions )
      .pipe(
        catchError( this.handleError )
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



}
