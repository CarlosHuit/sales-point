import { Component, OnInit } from '@angular/core';
import { ProvidersService  } from '../../services/providers/providers.service';
import { Provider } from '../../classes/providers';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-providers-register',
  templateUrl: './providers-register.component.html',
  styleUrls: ['./providers-register.component.css']
})
export class ProvidersRegisterComponent implements OnInit {

  name: string;
  tel: number;
  loading: boolean;

  constructor(
    private _providers: ProvidersService,
    private _storage:   StorageService,
    private _auth:      AuthService
    ) { }

  ngOnInit() {
  }

  saveProvider = () => {

    this.loading = true;

    const name = this.name.trim();
    const _id = this._storage.getElement('user')['userId'];


    if (name.length > 0 && this.tel) {
      const data = new Provider(_id, name, this.tel);

      this._providers.saveProvider(data)
        .subscribe(
          val => this.handleReqSuccess(val),
          err => this.handleError(err)
        );

    }

  }

  handleReqSuccess = (res) => {
    setTimeout(() => {
      this._auth.showError(res.message);
      delete(this.name);
      delete(this.tel);
      this.loading = false;
    }, 1000);
  }

  handleError = (err) => {
    setTimeout(() => {
      delete(this.name);
      delete(this.tel);
      this._auth.showError(err);
      this.loading = false;
    }, 1000);
  }

}
