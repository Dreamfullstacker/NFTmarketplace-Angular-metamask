import { DateAgoPipe } from './../../_pipe/date-ago.pipe';
import { SafeUrlPipe } from './../../_pipe/safe-url.pipe';
import { RouterModule } from '@angular/router';
import { ErrorFieldComponent } from './../error-field/error-field.component';
import { HeaderComponent } from './../header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';
import { CountdownComponent } from './../countdown/countdown.component';
import { FooterComponent } from './../footer/footer.component';
import { LiveAuctionComponent } from './../live-auction/live-auction.component';
import { TopSellerComponent } from './../top-seller/top-seller.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    ErrorFieldComponent,
    HeaderComponent,
    CountdownComponent,
    FooterComponent,
    LiveAuctionComponent,
    TopSellerComponent,
    SafeUrlPipe,
    DateAgoPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    ErrorFieldComponent,
    CountdownComponent,
    FooterComponent,
    LiveAuctionComponent,
    TopSellerComponent,
    SafeUrlPipe,
    DateAgoPipe,
  ],
})
export class SharedModule {}
