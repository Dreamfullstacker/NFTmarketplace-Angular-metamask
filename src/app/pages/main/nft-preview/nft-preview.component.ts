import { Component, OnInit } from '@angular/core';
import { NftService, UtilityService, ConnectService } from '../../../_services';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import { environment } from './../../../../environments/environment';

@Component({
  templateUrl: './nft-preview.component.html',
  styleUrls: ['./nft-preview.component.css'],
})
export class NftPreviewComponent implements OnInit {
  constructor(
    private nftService: NftService,
    private utility: UtilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private connectService: ConnectService
  ) {}

  // get user id from localstorage
  userId = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))['id']
    : '';
  user = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))
    : '';
  imgBaseUrl = environment.IMG_BASE_URL;
  nft: any = {};

  ngOnInit(): void {
    this.getNftById();
  }

  getNftById() {
    this.utility.startLoader();
    this.nftService
      .getNftById(this.activatedRoute.snapshot.paramMap.get('product_id'))
      .subscribe(
        (res) => {
          this.nft = res;
          this.utility.updatePageSEO(
            this.nft.name + ' | NFT Marketplace',
            this.nft.description
          );
          this.utility.stopLoader();
        },
        (error) => {
          console.log(error);
          this.utility.stopLoader();
          this.utility.showErrorAlert('Error', error);
        }
      );
  }

}
