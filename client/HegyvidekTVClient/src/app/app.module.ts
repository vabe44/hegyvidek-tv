import { AuthHttp, AUTH_PROVIDERS, provideAuth, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserXhr, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { CustExtBrowserXhr } from '../cust-ext-browser-xhr';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AdminMusorokComponent } from './admin-musorok/admin-musorok.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminEpizodokComponent } from './admin-epizodok/admin-epizodok.component';
import { AdminMusorokUjComponent } from './admin-musorok-uj/admin-musorok-uj.component';

export function getAuthHttp(http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    AdminMusorokComponent,
    AdminMenuComponent,
    AdminEpizodokComponent,
    AdminMusorokUjComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin/musorok/uj', component: AdminMusorokUjComponent },
      { path: 'admin/musorok', component: AdminMusorokComponent },
      { path: 'admin/epizodok', component: AdminEpizodokComponent },
      { path: 'admin', component: AdminComponent },
    ])
  ],
  providers: [
    AuthService,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, RequestOptions]
    },
    // CORS
    {provide: BrowserXhr, useClass: CustExtBrowserXhr},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
