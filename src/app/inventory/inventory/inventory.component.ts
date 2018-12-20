import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory/inventory.service';
import { Existence } from '../../classes/existence';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

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
    console.log(existences);
  }

  inventoryHandleError = (err: string) => {
    console.log(err);
  }

}
