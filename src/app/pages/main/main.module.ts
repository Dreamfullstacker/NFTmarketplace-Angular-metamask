import { SharedModule } from './../../_components/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProfileComponent } from './profile/profile.component';
import { SafeHtmlPipe } from '../../_pipe/safe-html.pipe';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { CreateNftComponent } from './create-nft/create-nft.component';
import { NftDetailComponent } from './nft-detail/nft-detail.component';
import { NftPreviewComponent } from './nft-preview/nft-preview.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    MarketplaceComponent,
    ContactComponent,
    AboutUsComponent,
    BlogsComponent,
    ProfileComponent,
    SafeHtmlPipe,
    FaqComponent,
    PrivacyPolicyComponent,
    TermConditionComponent,
    CreateNftComponent,
    NftDetailComponent,
    NftPreviewComponent,
    SearchResultComponent,
    ArtistProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    SharedModule,
    AvatarModule,
    NgxPaginationModule,
  ],
})
export class MainModule {}
