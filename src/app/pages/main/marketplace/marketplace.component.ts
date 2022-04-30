import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NftService, UtilityService } from '../../../_services';
@Component({
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css'],
})
export class MarketplaceComponent implements OnInit {
  constructor(
    private nftService: NftService,
    private utility: UtilityService,
    private formBuilder: FormBuilder
  ) {
    this.utility.updatePageSEO(
      'NFT Marketplace | Buy and Sell your NFT, and NFT Money. NFT Collections, Crypto artworks.',
      'Buy, Sell and trade your NFTs and NFT Money Secured with blockchain.'
    );
  }

  activeTab = 'grid';
  nfts: any = [];
  baseImageUrl = environment.IMG_BASE_URL;
  currentDate = new Date();
  filteredNfts: any = [];
  collectionList: any = [];
  selectedCollection: any = [];
  selectedCategory: any = [];
  filterForm: FormGroup;
  p: number = 1;
  categoryList = ['Image', 'Video'];

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filterItems: [[]],
      sort: ['new'],
    });
    this.getAllNfts();
  }

  getAllNfts() {
    var self = this;
    this.utility.startLoader();
    this.nftService.getNfts().subscribe(
      (res) => {
        this.utility.stopLoader();
        this.nfts = res;
        this.filteredNfts = res;
        this.getFilterList();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }

  getFilterList() {
    this.nfts.forEach((element) => {
      if (!this.collectionList[element.currentOwner.id]) {
        this.collectionList[element.currentOwner.id] =
          element.currentOwner.name;
      }
    });
  }

  onChangeArtist(event, item: any) {
    // Use appropriate model type instead of any
    if (this.selectedCollection.indexOf(item) > -1) {
      const index = this.selectedCollection.indexOf(item);
      if (index > -1) {
        this.selectedCollection.splice(index, 1);
      }
    } else {
      this.selectedCollection.push(item);
    }
  }

  onChangeCategory(event, item: any) {
    // Use appropriate model type instead of any
    if (this.selectedCategory.indexOf(item) > -1) {
      const index = this.selectedCategory.indexOf(item);
      if (index > -1) {
        this.selectedCategory.splice(index, 1);
      }
    } else {
      this.selectedCategory.push(item);
    }
  }

  applyFilter() {
    this.getFilteredItems();
  }

  async getFilteredItems() {
    var self = this;
    if (this.selectedCollection.length > 0) {
      self.filteredNfts = self.nfts.filter((element) => {
        return self.selectedCollection.indexOf(element.currentOwner.id) > -1;
      });
    } else {
      self.filteredNfts = self.nfts;
    }

     if (this.selectedCategory.length > 0) {
       self.filteredNfts = self.filteredNfts.filter((element) => {
         return self.selectedCategory.indexOf(element.category) > -1;
       });
     }

    if (this.filterForm.value.sort === 'new') {
      self.filteredNfts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    } else if (this.filterForm.value.sort === 'old') {
      self.filteredNfts.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    } else if (this.filterForm.value.sort === 'high') {
      self.filteredNfts.sort((a, b) => (a.price < b.price ? 1 : -1));
    } else if (this.filterForm.value.sort === 'low') {
      await self.filteredNfts.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
  }

  convertDate(date) {
    return new Date(date);
  }
}
