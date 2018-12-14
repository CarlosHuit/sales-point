import { NgModule                 } from '@angular/core';
import { Routes, RouterModule     } from '@angular/router';
import { SigninComponent          } from './auth/signin/signin.component';
import { SignupComponent          } from './auth/signup/signup.component';
import { IsLoggedInGuard          } from './auth/is-logged-in.guard';
import { AuthGuard                } from './auth/auth.guard';
import { DashboardComponent       } from './dashboard/dashboard.component';
import { SalesComponent           } from './sales/sales/sales.component';
import { PurchasesComponent       } from './purchases/purchases/purchases.component';
import { DevolutionsComponent     } from './devolutions/devolutions/devolutions.component';
import { SalesRegisterComponent } from './sales/sales-register/sales-register.component';
import { PurchasesRegisterComponent } from './purchases/purchases-register/purchases-register.component';
import { DevolutionsRegisterComponent } from './devolutions/devolutions-register/devolutions-register.component';


const routes: Routes = [

  { path: '',                       component: DashboardComponent,              canActivate: [AuthGuard]        },
  { path: 'signin',                 component: SigninComponent,                 canActivate: [IsLoggedInGuard]  },
  { path: 'signup',                 component: SignupComponent,                 canActivate: [IsLoggedInGuard]  },
  { path: 'sales',                  component: SalesComponent,                  canActivate: [AuthGuard]  },
  { path: 'sales/register',         component: SalesRegisterComponent,          canActivate: [AuthGuard]  },
  { path: 'purchases',              component: PurchasesComponent,              canActivate: [AuthGuard]  },
  { path: 'purchases/register',     component: PurchasesRegisterComponent,      canActivate: [AuthGuard]  },
  { path: 'devolutions',            component: DevolutionsComponent,            canActivate: [AuthGuard]  },
  { path: 'devolutions/register',   component: DevolutionsRegisterComponent,    canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
