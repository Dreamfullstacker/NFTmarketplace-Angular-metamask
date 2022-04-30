import { Component, OnInit } from '@angular/core';
import { UtilityService } from './../../../_services/utility.service';
@Component({
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private utility: UtilityService) {
    this.utility.updatePageSEO(
      'Privacy Policy | Buy and Sell your NFT, and NFT Money. NFT Collections, Crypto artworks.',
      'At Defy, we work every day to solve NFT Trading problems.'
    );
  }

  ngOnInit(): void {}
}
