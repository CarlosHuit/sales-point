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



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
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
