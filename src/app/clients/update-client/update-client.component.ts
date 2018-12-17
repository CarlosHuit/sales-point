import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients/clients.service';
import { Client } from '../../classes/client';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  loadingClients: boolean;
  clients:        Client[];
  currentClient:  Client;
  copyClient:     Client;

  constructor(private _client: ClientsService) { }

  ngOnInit() {
    this._client.getClients()
      .subscribe(
        this.getClientsSuccess,
        err => console.log(err)
      );
  }

  getClientsSuccess = (clients: Client[]) => {

    this.clients = clients;
    this.loadingClients = false;

  }

  changeClient = (client: Client) => {
    this.currentClient = client;
    this.copyClient = Object.assign({}, this.currentClient);
    // console.log(this.currentClient);
  }

  update = () => {
    console.log(this.currentClient);
    console.log(this.copyClient);
  }

}
