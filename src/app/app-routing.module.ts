import { NgModule                 } from '@angular/core';
import { Routes, RouterModule     } from '@angular/router';
import { SigninComponent          } from './auth/signin/signin.component';
import { SignupComponent          } from './auth/signup/signup.component';
import { IsLoggedInGuard          } from './auth/is-logged-in.guard';
import { AuthGuard                } from './auth/auth.guard';
import { DashboardComponent       } from './dashboard/dashboard.component';
import { SalesComponent           } from './sales/sales/sales.component';


const routes: Routes = [

  { path: '',             component: DashboardComponent,              canActivate: [AuthGuard]        },
  { path: 'signin',       component: SigninComponent,                 canActivate: [IsLoggedInGuard]  },
  { path: 'signup',       component: SignupComponent,                 canActivate: [IsLoggedInGuard]  },
  { path: 'ventas',       component: SalesComponent,                  canActivate: [AuthGuard]  },
  { path: 'compras',      component: SalesComponent,                  canActivate: [AuthGuard]  },
  { path: 'devoluciones', component: SalesComponent,                  canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
