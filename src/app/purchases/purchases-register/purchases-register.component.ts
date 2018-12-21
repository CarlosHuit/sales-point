import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { MatDialog              } from '@angular/material';
import { AddProductComponent    } from '../../dialogs/add-product/add-product.component';
import { Product                } from '../../classes/product';
import { Article, Order         } from '../../classes/order';
import { StorageService         } from '../../services/storage/storage.service';
import { ClientsService         } from '../../services/clients/clients.service';
import { Client                 } from 'src/app/classes/client';
import { OrdersService          } from '../../services/orders/orders.service';
import { RemoveArticleComponent } from '../../dialogs/remove-article/remove-article.component';
import { ProvidersService       } from '../../services/providers/providers.service';
import { Purchase } from '../../classes/purchase';
import { Provider } from '../../classes/providers';
import { PurchasesService } from '../../services/purchases/purchases.service';

@Component({
  selector: 'app-purchases-register',
  templateUrl: './purchases-register.component.html',
  styleUrls: ['./purchases-register.component.css']
})
export class PurchasesRegisterComponent implements OnInit {

  purchase:       Purchase;
  providers:      Provider[];

  columns:        string[] = ['Sku', 'Descripción', 'U.', 'Sub total'];
  activeDialog:   boolean;
  bill:           boolean;
  dataSource =    [];
  awaitBill:      boolean;
  loadingClients = true;
  loadingProviders = true;


  constructor(
    private authService:  AuthService,
    private _storage:     StorageService,
    private _client:      ClientsService,
    private _orders:      OrdersService,
    private dialog:       MatDialog,
    private _providers:   ProvidersService,
    private _purchases:   PurchasesService
    ) { }

  ngOnInit() {
    this.getProviders();
  }

  billing     = () => this.bill = true;
  openDialog  = () => this.activeDialog = true;
  closeDialog = ev => this.activeDialog = false;
  genTotal    = () => this.dataSource.map(p => p.subTotal()).reduce((acc, val) => acc + val, 0);
  closeDialogBill = (state: EventListener) => this.bill = false;


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
    this.purchase.articles.push(data.article);
  }

  registerSale = (ev: {date: Date, received: number}) => {

    this.awaitBill        = true;
    this.purchase.payment   = ev.received;
    this.purchase.purchaseDate = ev.date;
    this.purchase.total      = this.genTotal();
    this.bill             = false;

    this._purchases.savePurchase(this.purchase)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
        // this.handleSuccesSave,
        // this.handleErrorSave
        );

  }

  handleSuccesSave = (res) => {
    setTimeout(() => {
      this.dataSource       = [];
      this.purchase.articles   = [];
      this.purchase.purchaseDate = null;
      this.purchase.payment     = null;
      this.purchase.total      = null;
      this.awaitBill        = false;

      this.authService.showError(res.message);

    }, 1000);
  }

  handleErrorSave = (err) => {

    setTimeout(() => (this.awaitBill = false, this.authService.showError(err)), 1000);

  }

  getProviders = () => {
    this._providers.getProviders()
      .subscribe(
        providers => {
          const user_id = this._storage.getElement('user')['userId'];
          this.purchase = new Purchase(user_id, null, null, [], 0, 0, null);
          const index   = providers.findIndex(p => p.name.toLowerCase() === 'proveedor genérico');
          this.purchase.provider = providers[index];
          console.log(this.purchase);
          this.providers = providers;
          this.loadingProviders = false;
        },
        err => this.authService.showError('No se puede obtener los proveedores')
      );

  }




  changeProvider = (provider: Provider) => this.purchase.provider = provider;

  deleteArticle = (i: number) => {
    this.dataSource.splice(i, 1);
    this.purchase.articles.splice(i, 1);
    this.authService.showError('Producto Eliminado');
  }

}
