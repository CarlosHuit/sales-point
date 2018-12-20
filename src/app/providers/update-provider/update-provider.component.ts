import { Component, OnInit  } from '@angular/core';
import { ClientsService     } from '../../services/clients/clients.service';
import { Client             } from '../../classes/client';
import { AuthService        } from '../../auth/auth.service';
import { StorageService     } from '../../services/storage/storage.service';
import { Provider           } from '../../classes/providers';
import { ProvidersService   } from '../../services/providers/providers.service';


@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.css']
})
export class UpdateProviderComponent implements OnInit {

  loading: boolean;

  loadingProviders: boolean;
  currentProvider:  Provider;
  copyProvider:    Provider;
  providers:        Provider[];

  constructor(
    private _client:  ClientsService,
    private _auth:    AuthService,
    private _storage: StorageService,
    private _provider: ProvidersService
    ) { }

  ngOnInit() {
    this.getProviders();
  }

  getProviders = () => {
    this._provider.getProviders()
      .subscribe( this.getProvidersSucces, err => console.log(err) );
  }

  getProvidersSucces = (providers: Provider[]) => {
    setTimeout(() => {
      this.providers = providers;
      this.loadingProviders = false;
    }, 500);
  }


  changeProvider = (provider: Provider) => {
    this.currentProvider = provider;
    this.copyProvider = Object.assign({}, this.currentProvider);
  }

  update = () => {

    const data = Object.assign({}, this.currentProvider);
    delete(this.currentProvider);
    delete(this.copyProvider);
    this.loading = true;

    this._provider.updateProvider(data)
    .subscribe(
      this.handleSuccessUpdate,
      this.handleFailedUpdate
    );

  }

  handleSuccessUpdate = (client) => {

    setTimeout(() => {
      this.saveProvider(client);
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

  saveProvider = (provider: Provider) => {

    const providers: Provider[] = this._storage.getElement('providers');

    if ( providers) {

      const index = providers.findIndex( c => c._id === provider._id  );

      if (index !== -1) {
        providers[index] = provider;
      } else {
        providers.push(provider);
      }

      this._storage.saveElement('providers', providers);
    }

    if (!providers) {
      this._storage.saveElement('providers', [provider]);
    }

  }

}
