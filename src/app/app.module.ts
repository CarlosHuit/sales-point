import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule                         } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule                 } from '@angular/common/http';
import { AppRoutingModule                 } from './app-routing.module';
import { AppComponent                     } from './app.component';
import { ServiceWorkerModule              } from '@angular/service-worker';
import { environment                      } from '../environments/environment';
import { BrowserAnimationsModule          } from '@angular/platform-browser/animations';
import { MaterialModule                   } from './material';
import { GestureConfig                    } from '@angular/material';
import { SigninComponent                  } from './auth/signin/signin.component';
import { SignupComponent                  } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './clients/clients/clients.component';
import { ProvidersComponent } from './providers/providers/providers.component';
import { ProductsComponent } from './products/products/products.component';
import { SalesComponent } from './sales/sales/sales.component';
import { AdminComponent } from './admin/admin/admin.component';
import { PermissionsComponent } from './admin/permissions/permissions.component';
import { EstadisticsComponent } from './admin/estadistics/estadistics.component';
import { EarningsComponent } from './admin/earnings/earnings.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LateralBarComponent } from './dashboard/lateral-bar/lateral-bar.component';
import { PurchasesComponent } from './purchases/purchases/purchases.component';
import { DevolutionsComponent } from './devolutions/devolutions/devolutions.component';
import { SalesRegisterComponent } from './sales/sales-register/sales-register.component';
import { PurchasesRegisterComponent } from './purchases/purchases-register/purchases-register.component';
import { DevolutionsRegisterComponent } from './devolutions/devolutions-register/devolutions-register.component';
import { ProductsRegisterComponent } from './products/products-register/products-register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddProductComponent } from './dialogs/add-product/add-product.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { UpdatePriceComponent } from './products/update-price/update-price/update-price.component';
import { UpdateProductComponent } from './products/update-product/update-product/update-product.component';
import { SearchProductComponent } from './products/search-product/search-product/search-product.component';



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    ClientsComponent,
    ProvidersComponent,
    ProductsComponent,
    SalesComponent,
    AdminComponent,
    PermissionsComponent,
    EstadisticsComponent,
    EarningsComponent,
    ToolbarComponent,
    LateralBarComponent,
    PurchasesComponent,
    DevolutionsComponent,
    SalesRegisterComponent,
    PurchasesRegisterComponent,
    DevolutionsRegisterComponent,
    ProductsRegisterComponent,
    NotFoundComponent,
    AddProductComponent,
    TitleBarComponent,
    UpdatePriceComponent,
    UpdateProductComponent,
    SearchProductComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  entryComponents: [
    AddProductComponent,
    // DeleteCommentDialogComponent
  ],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
