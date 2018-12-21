import { Component, OnInit  } from '@angular/core';
import { TimeInterval       } from '../../classes/time-interval';
import { DevolutionService  } from '../../services/devolution/devolution.service';
import { Devolution         } from '../../classes/devolution';
import { AuthService        } from '../../auth/auth.service';

@Component({
  selector: 'app-devolutions',
  templateUrl: './devolutions.component.html',
  styleUrls: ['./devolutions.component.css']
})
export class DevolutionsComponent implements OnInit {

  loadingDevolutions: boolean;
  timeInterval: TimeInterval;
  devolutions:  Devolution[];

  titles = ['No.', 'fecha', 'sku', 'descripción', 'usuario', 'U.'];

  constructor(
    private _devolutions: DevolutionService,
    private _auth:        AuthService
  ) { }

  ngOnInit() {
  }

  searchByInterval = (dates: TimeInterval) => {
    this.loadingDevolutions = true;
    this.timeInterval = dates;

    this._devolutions.getDevolutions(dates)
      .subscribe(
        this.getPurchasesSucces,
        this.getPurchasesError
      );

  }


  getPurchasesSucces = (res: {message: string, devolutions: Devolution[]}) => {
    setTimeout(() => {

      console.log(res);
      if (res.devolutions.length > 0) {
        this.devolutions = res.devolutions;
        this.loadingDevolutions = false;
      }

      if (res.devolutions.length === 0) {
        this.loadingDevolutions = false;
        this._auth.showError(res.message);
      }

    }, 1000);
  }

  getPurchasesError = (err: string) => {
    setTimeout(
      () => (this.loadingDevolutions = false, this._auth.showError(err)),
      1000
    );
  }


}
