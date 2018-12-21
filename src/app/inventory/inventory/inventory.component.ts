import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory/inventory.service';
import { Existence } from '../../classes/existence';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  loadingInventory = true;
  existences: Existence[];
  sortSKu       = false;
  sortDesc      = false;
  sortExistence = false;
  sort: string;

  constructor(
    private _inventory: InventoryService
  ) { }

  ngOnInit() {
    this._inventory.getInventory()
      .subscribe(
        this.successInGettingInventory,
        this.inventoryHandleError
      );
  }

  successInGettingInventory = (existences: Existence[]) => {
    setTimeout(() => {
      this.existences = existences;
      this.loadingInventory = false;
    }, 1000);
    console.log(existences);
  }

  inventoryHandleError = (err: string) => {
    console.log(err);
  }

  sortBySku = () => {

    this.sort = 'sku';

    switch (this.sortSKu) {
      case true:
        this.existences.sort((a: Existence, b: Existence) => a.product.sku > b.product.sku ? 1 : a.product.sku < b.product.sku ? -1 : 0);
        this.sortSKu = false;
        break;

        case false:
        this.existences.sort((a: Existence, b: Existence) => a.product.sku < b.product.sku ? 1 : a.product.sku > b.product.sku ? -1 : 0);
        this.sortSKu = true;
        break;

      default:
        break;
    }
  }

  sortByDesc = () => {

    this.sort = 'desc';

    switch (this.sortDesc) {
      case true:
        this.existences.sort((a: Existence, b: Existence) => {
          return a.product.sku > b.product.sku ? 1 : a.product.description < b.product.description ? -1 : 0;
        });
        this.sortDesc = false;
        break;

        case false:
        this.existences.sort((a: Existence, b: Existence) => {
          return a.product.sku < b.product.sku ? 1 : a.product.description > b.product.description ? -1 : 0;
        });
        this.sortDesc = true;
        break;

      default:
        break;
    }
  }

  sortByExistence = () => {

    this.sort = 'x';

    switch (this.sortExistence) {
      case true:
        this.existences.sort((a: Existence, b: Existence) => {
          return a.product.sku > b.product.sku ? 1 : a.existences < b.existences ? -1 : 0;
        });
        this.sortExistence = false;
        break;

        case false:
        this.existences.sort((a: Existence, b: Existence) => {
          return a.product.sku < b.product.sku ? 1 : a.existences > b.existences ? -1 : 0;
        });
        this.sortExistence = true;
        break;

      default:
        break;
    }
  }

}
