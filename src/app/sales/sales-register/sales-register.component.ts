import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { MatDialog            } from '@angular/material';
import { AddProductComponent  } from '../../dialogs/add-product/add-product.component';
import { Product              } from '../../classes/product';
import { Article, Order       } from '../../classes/order';
import { StorageService       } from '../../services/storage/storage.service';
import { ClientsService       } from '../../services/clients/clients.service';
import { Client               } from 'src/app/classes/client';
import { OrdersService        } from '../../services/orders/orders.service';
import { RemoveArticleComponent } from '../../dialogs/remove-article/remove-article.component';

@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.component.html',
  styleUrls: ['./sales-register.component.css']
})
export class SalesRegisterComponent implements OnInit {


  signinForm:     FormGroup;
  clients:        Client[];
  order:          Order;
  columns:        string[] = ['Sku', 'Descripción', 'U.', 'Sub total'];
  activeDialog:   boolean;
  bill:           boolean;
  dataSource =    [];
  awaitBill:      boolean;
  loadingClients = true;


  constructor(
    private authService:  AuthService,
    private _storage:     StorageService,
    private _client:      ClientsService,
    private _orders:      OrdersService,
    private dialog:       MatDialog
    ) { }

  ngOnInit() {
    this.getClients();
  }

  billing     = () => this.bill = true;
  openDialog  = () => this.activeDialog = true;
  closeDialog = ev => this.activeDialog = false;
  genTotal    = () => this.dataSource.map(p => p.subTotal()).reduce((acc, val) => acc + val, 0);
  closeDialogBill = (state: EventListener) => this.bill = false;


  restartData = () => {

    this.getClients();
  }

  openDialogDelete = (i: number) => {

    const dialogRef = this.dialog.open(
      RemoveArticleComponent,
      {
        disableClose: true,
        data: this.dataSource[i]
      }
    );

    dialogRef.afterClosed()
      .subscribe( ev => ev === true ? this.deleteArticle(i) : null );

  }

  addProduct = (data: {product: Product, article: Article}) => {
    this.dataSource.push(data.product);
    this.order.articles.push(data.article);
  }

  registerSale = (ev: {date: Date, received: number}) => {

    this.awaitBill        = true;
    this.order.received   = ev.received;
    this.order.dateBilled = ev.date;
    this.order.total      = this.genTotal();
    this.bill             = false;

    this._orders.saveOrder(this.order)
      .subscribe(
        this.handleSuccesSave,
        this.handleErrorSave
        );

  }

  handleSuccesSave = (res) => {
    setTimeout(() => {
      this.dataSource       = [];
      this.order.articles   = [];
      this.order.dateBilled = null;
      this.order.received   = null;
      this.order.total      = null;
      this.awaitBill        = false;

      this.authService.showError(res.message);

    }, 1000);
  }

  handleErrorSave = (err) => {

    setTimeout(() => (this.awaitBill = false, this.authService.showError(err)), 1000);

  }

  getClients = () => {
    this._client.getClients()
      .subscribe(
        clients => {
          const user_id = this._storage.getElement('user')['userId'];
          this.order    = new Order(user_id, null, null, [], 0, 0, null);
          const index       = clients.findIndex(cl => cl.name.toLowerCase() === 'cliente genérico');
          this.order.client = clients[index];
          this.clients      = clients;
          this.loadingClients = false;
        },
        err => this.authService.showError('No se puede obtener los clientes')
      );
  }

  changeClient = (client: Client) => this.order.client = client;

  deleteArticle = (i: number) => {
    this.dataSource.splice(i, 1);
    this.order.articles.splice(i, 1);
    this.authService.showError('Producto Eliminado');
  }

}
