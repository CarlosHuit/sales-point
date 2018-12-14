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
import { ShoppingComponent } from './shopping/shopping/shopping.component';
import { AdminComponent } from './admin/admin/admin.component';
import { PermissionsComponent } from './admin/permissions/permissions.component';
import { EstadisticsComponent } from './admin/estadistics/estadistics.component';
import { EarningsComponent } from './admin/earnings/earnings.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LateralBarComponent } from './dashboard/lateral-bar/lateral-bar.component';



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
    ShoppingComponent,
    AdminComponent,
    PermissionsComponent,
    EstadisticsComponent,
    EarningsComponent,
    ToolbarComponent,
    LateralBarComponent,
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
    // IconsUserDialogComponent,
    // DeleteCommentDialogComponent
  ],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
