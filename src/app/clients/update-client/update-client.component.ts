import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients/clients.service';
import { Client } from '../../classes/client';
import { AuthService } from '../../auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  loadingClients = true;
  clients:        Client[];
  currentClient:  Client;
  copyClient:     Client;
  loading: boolean;

  constructor(private _client: ClientsService, private _auth: AuthService, private _storage: StorageService) { }

  ngOnInit() {
    this._client.getClients()
      .subscribe(
        this.getClientsSuccess,
        err => console.log(err)
      );
  }

  getClientsSuccess = (clients: Client[]) => {

    setTimeout(() => {
      this.clients = clients;
      this.loadingClients = false;
    }, 500);

  }

  changeClient = (client: Client) => {
    this.currentClient = client;
    this.copyClient = Object.assign({}, this.currentClient);
  }

  update = () => {

    const data = Object.assign({}, this.currentClient);
    delete(this.currentClient);
    delete(this.copyClient);
    this.loading = true;

    this._client.updateClient(data)
      .subscribe(
        this.handleSuccessUpdate,
        this.handleFailedUpdate
      );

  }

  handleSuccessUpdate = (client) => {

    setTimeout(() => {
      this.saveClient(client);
      this.loading = false;
      this._auth.showError('Datos Actualizados');
    }, 1000);
  }

  handleFailedUpdate = (err) => {

    setTimeout(() => {
      this.loading = false;
      this._auth.showError(err);
    }, 1000);
  }

  saveClient = (client) => {

    const clients: Client[] = this._storage.getElement('clients');
    if ( clients) {

      const index = clients.findIndex( c => c._id === client._id  );

      if (index !== -1) {
        clients[index] = client;
      } else {
        clients.push(client);
      }

      this._storage.saveElement('clients', clients);
    }

    if (!clients) {
      this._storage.saveElement('clients', [client]);
    }

  }

}
