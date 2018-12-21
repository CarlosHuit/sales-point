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

  loadingSales: boolean;
  timeInterval: TimeInterval;
  devolutions:  Devolution[];

  constructor(
    private _devolutions: DevolutionService,
    private _auth:        AuthService
  ) { }

  ngOnInit() {
  }

  searchByInterval = (dates: TimeInterval) => {
    this.loadingSales = true;
    this.timeInterval = dates;

    this._devolutions.getDevolutions(dates)
      .subscribe(
        this.getPurchasesSucces,
        this.getPurchasesError
      );

  }


  getPurchasesSucces = (res: Devolution[]) => {
    setTimeout(() => {

      console.log(res);
      // if (res.purchases.length > 0) {
      //   this.purchases = res.purchases;
      //   this.loadingSales = false;
      // }

      // if (res.purchases.length === 0) {
      //   this.loadingSales = false;
      //   this._auth.showError(res.message);
      // }

    }, 1000);
  }

  getPurchasesError = (err: string) => {
    setTimeout(
      () => (this.loadingSales = false, this._auth.showError(err)),
      1000
    );
  }


}
