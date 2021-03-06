import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
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
import { MusorService } from './services/musor.service';
import { IdojarasService } from './services/idojaras.service';
import { KapcsolatService } from './services/kapcsolat.service';
import { YoutubeService } from './services/youtube.service';
import { HirService } from './services/hir.service';
import { BannerService } from './services/banner.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AdminMusorokComponent } from './admin-musorok/admin-musorok.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminEpizodokComponent } from './admin-epizodok/admin-epizodok.component';
import { AdminMusorokUjComponent } from './admin-musorok-uj/admin-musorok-uj.component';
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
import { MusorComponent } from './musor/musor.component';
import { RegebbiVideokComponent } from './regebbi-videok/regebbi-videok.component';
import { MusorujsagComponent } from './musorujsag/musorujsag.component';
import { KeresesComponent } from './kereses/kereses.component';
import { KeresesTalalatokComponent } from './kereses-talalatok/kereses-talalatok.component';
import { AdminHirekComponent } from './admin-hirek/admin-hirek.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AdminEpizodokUjComponent } from './admin-epizodok-uj/admin-epizodok-uj.component';
import { AdminEpizodokModositComponent } from './admin-epizodok-modosit/admin-epizodok-modosit.component';
import { EpizodService } from './services/epizod.service';
import { AdminYoutubeAuthComponent } from './admin-youtube-auth/admin-youtube-auth.component';
import { YoutubeEmbedPipe } from './pipes/youtube-embed.pipe';
import { DatumPipe } from './pipes/datum.pipe';
import { AdminKapcsolatComponent } from './admin-kapcsolat/admin-kapcsolat.component';
import { AuthGuard } from './services/auth-guard.service';
import { BannerTopComponent } from './banner-top/banner-top.component';
import { BannerFooterComponent } from './banner-footer/banner-footer.component';
import { AdminBannerekComponent } from './admin-bannerek/admin-bannerek.component';
import { MusorujsagService } from './services/musorujsag.service';
import { AdminMusorujsagComponent } from './admin-musorujsag/admin-musorujsag.component';
import { CallbackPipe } from './pipes/callback.pipe';
import { OraPipe } from './pipes/ora.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { SortDescPipe } from './pipes/sort-desc.pipe';
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
    MusorainkComponent,
    MusorComponent,
    RegebbiVideokComponent,
    MusorujsagComponent,
    KeresesComponent,
    KeresesTalalatokComponent,
    AdminHirekComponent,
    AdminEpizodokUjComponent,
    AdminEpizodokModositComponent,
    AdminYoutubeAuthComponent,
    YoutubeEmbedPipe,
    DatumPipe,
    AdminKapcsolatComponent,
    BannerTopComponent,
    BannerFooterComponent,
    AdminBannerekComponent,
    AdminMusorujsagComponent,
    CallbackPipe,
    OraPipe,
    SortPipe,
    SortDescPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FileUploadModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'musoraink', component: MusorainkComponent },
      { path: 'musoraink/:musor', component: MusorComponent },
      { path: 'musoraink/:musor/:epizod', component: MusorComponent },
      { path: 'musorujsag', component: MusorujsagComponent },
      { path: 'kapcsolat', component: KapcsolatComponent },
      { path: 'mediaajanlat', component: MediaajanlatComponent },
      { path: 'kereses/:szoveg', component: KeresesComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin/hirek', component: AdminHirekComponent, canActivate: [AuthGuard] },
      { path: 'admin/musorok/uj', component: AdminMusorokUjComponent, canActivate: [AuthGuard] },
      { path: 'admin/musorok/:id', component: AdminMusorokModositComponent, canActivate: [AuthGuard] },
      { path: 'admin/musorok', component: AdminMusorokComponent, canActivate: [AuthGuard] },
      { path: 'admin/epizodok', component: AdminEpizodokComponent, canActivate: [AuthGuard] },
      { path: 'admin/epizodok/uj', component: AdminEpizodokUjComponent, canActivate: [AuthGuard] },
      { path: 'admin/epizodok/:id', component: AdminEpizodokModositComponent, canActivate: [AuthGuard] },
      // { path: 'admin/youtube', component: AdminYoutubeAuthComponent, canActivate: [AuthGuard] },
      { path: 'admin/bannerek', component: AdminBannerekComponent, canActivate: [AuthGuard] },
      { path: 'admin/musorujsag', component: AdminMusorujsagComponent, canActivate: [AuthGuard] },
      { path: 'admin/kapcsolat', component: AdminKapcsolatComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: AdminMusorokComponent, canActivate: [AuthGuard] },
    ])
  ],
  providers: [
    AuthService,
    MusorService,
    MusorujsagService,
    EpizodService,
    IdojarasService,
    HirService,
    BannerService,
    YoutubeService,
    KapcsolatService,
    AuthHttp,
    AuthGuard,
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
