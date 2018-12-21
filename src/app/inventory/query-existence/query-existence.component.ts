import { Component, OnInit  } from '@angular/core';
import { AuthService        } from '../../auth/auth.service';
import { Existence          } from '../../classes/existence';
import { InventoryService   } from '../../services/inventory/inventory.service';

@Component({
  selector: 'app-query-existence',
  templateUrl: './query-existence.component.html',
  styleUrls: ['./query-existence.component.css']
})
export class QueryExistenceComponent implements OnInit {


  code: string;
  existence: Existence | any;
  loading: boolean;

  constructor(
    private _auth: AuthService,
    private _inventory: InventoryService
    ) { }

  ngOnInit() {
  }

  queryExistence = () => {
    const code = this.code.toString().trim();
    delete(this.code);

    if (code.length > 0) {
      delete(this.existence);
      this.loading = true;
      this._inventory.queryExistence(code)
        .subscribe(
          this.handleReqSuccess,
          this.handleError
        );

    }
  }

  handleReqSuccess = (existence: Existence) => {
    setTimeout(() => {
      console.log(existence);
      this.existence = existence;
      this.loading = false;
    }, 1000);
  }

  handleError = (err: string) => {
    setTimeout(() => {
      this._auth.showError(err);
      this.loading = false;
    }, 1000);
  }

}
