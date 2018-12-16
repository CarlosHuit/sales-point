import { Component, OnInit } from '@angular/core';
import { ClientsService    } from '../../services/clients/clients.service';
import { Client } from '../../classes/client';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  name = '';
  address = '';
  loading: boolean;

  constructor(private _clients: ClientsService, private _auth: AuthService) { }

  ngOnInit() {
  }

  saveClient = () => {

    this.loading  = true;
    const name = this.name.trim();
    const address = this.address.trim();

    if (name.length > 0 && address.length > 0) {

      const client = new Client(name, address);
      this._clients.saveClient(client)
        .subscribe(
          val => this.handleReqSucces(val),
          err => this.handleError(err)
        );

    }

  }

  handleReqSucces = (res) => {
    setTimeout(() => {
      this.name = '';
      this.address = '';
      this.loading = false;
      this._auth.showError(res['message']);
    }, 1000);
  }

  handleError = (err) => {
    delete(this.address);
    delete(this.name);
    this.loading = false;
    this._auth.showError(err);
  }

}
