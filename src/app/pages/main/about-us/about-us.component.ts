import { UtilityService } from './../../../_services/utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  constructor(private utility: UtilityService) {
    this.utility.updatePageSEO(
      'NFT Marketplace | Buy and Sell your NFT, and NFT Money. NFT Collections, Crypto artworks.',
      'At Defy, we work every day to solve NFT Trading problems.'
    );
  }

  ngOnInit(): void {}
}
