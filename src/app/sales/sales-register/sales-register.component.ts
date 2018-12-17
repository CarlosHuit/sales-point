import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../classes/user';
import { MatDialog } from '@angular/material';
import { AddProductComponent } from '../../dialogs/add-product/add-product.component';
import { Product } from '../../classes/product';
import { Article, Order } from '../../classes/order';
import { StorageService } from '../../services/storage/storage.service';
import { ClientsService } from '../../services/clients/clients.service';
import { Client } from 'src/app/classes/client';


@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.component.html',
  styleUrls: ['./sales-register.component.css']
})
export class SalesRegisterComponent implements OnInit {


  signinForm:   FormGroup;
  imgUrl:       string;
  columns:      string[] = ['Sku', 'Descripción', 'U.', 'Sub total'];
  activeDialog: boolean;
  dataSource =  [];
  order:        Order;

  bill: boolean;
  clients: Client[];

  constructor(
    private authService:  AuthService,
    private _storage:     StorageService,
    private dialog:       MatDialog,
    private _client:      ClientsService
    ) { }

  ngOnInit() {
    this.getClients();
    const user_id = this._storage.getElement('user')['userId'];
    this.order = new Order(user_id, '10100101', null, [], 0, 0);
  }

  billing = () => {
    this.bill = true;
  }

  openDialog = () => {
    this.activeDialog = true;
  }

  closeDialog = (ev) => {
    this.activeDialog = false;
  }

  addProduct = (data: {product: Product, article: Article}) => {
    this.dataSource.push(data.product);
    this.order.articles.push(data.article);
  }

  genTotal = () => {
    return this.dataSource.map(p => p.subTotal()).reduce((acc, val) => acc + val, 0);
  }

  closeDialogBill = (state) => {
    this.bill = false;
  }

  registerSale = (ev: {date: Date, received: number}) => {

    this.order.received = ev.received;
    this.order.billing_date = ev.date;
    this.order.total = this.genTotal();

    this.dataSource = [];
    this.bill = false;
    console.log(this.order);

  }

  getClients = () => {
    this._client.getClients()
      .subscribe(
        clients => {
          const index       = clients.findIndex(cl => cl.name.toLowerCase() === 'cliente gérico');
          this.order.client = clients[index];
          this.clients      = clients;
        },
        err => this.authService.showError('No se puede obtener los clientes')
      );
  }

  changeClient = (client: Client) => {
    this.order.client = client;
  }


}
