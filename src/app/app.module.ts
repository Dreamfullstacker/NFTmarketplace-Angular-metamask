import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxUiLoaderModule, NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from "ngx-ui-loader";

  
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: "white",
  pbColor: "white",
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


import { ToastrModule } from 'ngx-toastr';
// all guards
import { AuthGuard } from './_guards/auth.guard';
// all intercepters
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

// All Services
import { AuthenticationService, UtilityService, UserService } from './_services/index';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TwoDigitDecimalDirective } from './_directives/two-digit-decimal.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    TwoDigitDecimalDirective
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
        timeOut: 2000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
    }), // ToastrModule added
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    AuthenticationService,
    UtilityService,
    UserService
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
