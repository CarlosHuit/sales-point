import { NgModule                     } from '@angular/core';
import { Routes, RouterModule         } from '@angular/router';
import { SigninComponent              } from './auth/signin/signin.component';
import { SignupComponent              } from './auth/signup/signup.component';
import { IsLoggedInGuard              } from './auth/is-logged-in.guard';
import { AuthGuard                    } from './auth/auth.guard';
import { DashboardComponent           } from './dashboard/dashboard.component';
import { SalesComponent               } from './sales/sales/sales.component';
import { PurchasesComponent           } from './purchases/purchases/purchases.component';
import { DevolutionsComponent         } from './devolutions/devolutions/devolutions.component';
import { SalesRegisterComponent       } from './sales/sales-register/sales-register.component';
import { PurchasesRegisterComponent   } from './purchases/purchases-register/purchases-register.component';
import { DevolutionsRegisterComponent } from './devolutions/devolutions-register/devolutions-register.component';
import { ProductsComponent            } from './products/products/products.component';
import { ProductsRegisterComponent    } from './products/products-register/products-register.component';
import { NotFoundComponent            } from './not-found/not-found.component';
import { UpdateProductComponent       } from './products/update-product/update-product/update-product.component';
import { UpdatePriceComponent         } from './products/update-price/update-price/update-price.component';
import { SearchProductComponent       } from './products/search-product/search-product/search-product.component';
import { ClientRegisterComponent      } from './clients/client-register/client-register.component';
import { ProvidersRegisterComponent   } from './providers/providers-register/providers-register.component';


const routes: Routes = [

  { path: '',                       component: DashboardComponent,              canActivate: [AuthGuard]        },
  { path: 'signin',                 component: SigninComponent,                 canActivate: [IsLoggedInGuard]  },
  { path: 'signup',                 component: SignupComponent,                 canActivate: [AuthGuard]  },
  { path: 'sales',                  component: SalesComponent,                  canActivate: [AuthGuard]  },
  { path: 'sales/register',         component: SalesRegisterComponent,          canActivate: [AuthGuard]  },
  { path: 'purchases',              component: PurchasesComponent,              canActivate: [AuthGuard]  },
  { path: 'purchases/register',     component: PurchasesRegisterComponent,      canActivate: [AuthGuard]  },
  { path: 'devolutions',            component: DevolutionsComponent,            canActivate: [AuthGuard]  },
  { path: 'devolutions/register',   component: DevolutionsRegisterComponent,    canActivate: [AuthGuard]  },

  { path: 'products',               component: ProductsComponent,               canActivate: [AuthGuard]  },
  { path: 'products/register',      component: ProductsRegisterComponent,       canActivate: [AuthGuard]  },
  { path: 'products/update',        component: UpdateProductComponent,          canActivate: [AuthGuard]  },
  { path: 'products/update-price',  component: UpdatePriceComponent,            canActivate: [AuthGuard]  },
  { path: 'products/search',        component: SearchProductComponent,          canActivate: [AuthGuard]  },
  { path: 'clients/register',       component: ClientRegisterComponent,         canActivate: [AuthGuard]  },
  { path: 'providers/register',     component: ProvidersRegisterComponent,      canActivate: [AuthGuard]  },

  { path: '404',                    component: NotFoundComponent,               canActivate: [AuthGuard]  }, // mejorar

  { path: '**',                     redirectTo: '404'                   }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
