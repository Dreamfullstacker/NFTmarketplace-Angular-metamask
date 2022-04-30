import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { ArtistGuard } from 'src/app/_guards/artist.guard';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { CreateNftComponent } from './create-nft/create-nft.component';
import { NftDetailComponent } from './nft-detail/nft-detail.component';
import { NftPreviewComponent } from './nft-preview/nft-preview.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactComponent },
      { path: 'faq', component: FaqComponent },
      {
        path: 'create-nft',
        canActivate: [ArtistGuard],
        component: CreateNftComponent,
      },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'terms-condition', component: TermConditionComponent },
      { path: 'marketplace', component: MarketplaceComponent },
      { path: 'marketplace/:product_id', component: NftDetailComponent },
      { path: 'artist-profile/:artist_id', component: ArtistProfileComponent },
      { path: 'search/:term', component: SearchResultComponent },
      {
        path: 'manage-profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
      },
      { path: 'my-nft/:product_id', component: NftPreviewComponent },
    ],
  },
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
