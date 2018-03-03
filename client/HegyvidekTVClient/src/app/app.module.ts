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
import { MusorService } from './services/musor.service';
import { AdminMusorokModositComponent } from './admin-musorok-modosit/admin-musorok-modosit.component';
import { HeaderComponent } from './header/header.component';
import { EloAdasComponent } from './elo-adas/elo-adas.component';
import { HirekScrollerComponent } from './hirek-scroller/hirek-scroller.component';
import { MenuComponent } from './menu/menu.component';
import { IdojarasComponent } from './idojaras/idojaras.component';
import { KiemeltVideokComponent } from './kiemelt-videok/kiemelt-videok.component';
import { LegfrissebbHirekComponent } from './legfrissebb-hirek/legfrissebb-hirek.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { PartnerekComponent } from './partnerek/partnerek.component';
import { FooterComponent } from './footer/footer.component';
import { KapcsolatComponent } from './kapcsolat/kapcsolat.component';
import { MediaajanlatComponent } from './mediaajanlat/mediaajanlat.component';
import { MusorainkComponent } from './musoraink/musoraink.component';

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
    AdminMusorokUjComponent,
    AdminMusorokModositComponent,
    HeaderComponent,
    EloAdasComponent,
    HirekScrollerComponent,
    MenuComponent,
    IdojarasComponent,
    KiemeltVideokComponent,
    LegfrissebbHirekComponent,
    SocialMediaComponent,
    PartnerekComponent,
    FooterComponent,
    KapcsolatComponent,
    MediaajanlatComponent,
    MusorainkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'musoraink', component: MusorainkComponent },
      { path: 'kapcsolat', component: KapcsolatComponent },
      { path: 'mediaajanlat', component: MediaajanlatComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin/musorok/uj', component: AdminMusorokUjComponent },
      { path: 'admin/musorok/:id', component: AdminMusorokModositComponent },
      { path: 'admin/musorok', component: AdminMusorokComponent },
      { path: 'admin/epizodok', component: AdminEpizodokComponent },
      { path: 'admin', component: AdminMusorokComponent },
    ])
  ],
  providers: [
    AuthService,
    MusorService,
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
