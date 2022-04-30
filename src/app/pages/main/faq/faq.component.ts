import { Component, OnInit } from '@angular/core';
import { UtilityService } from './../../../_services/utility.service';
@Component({
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  constructor(private utility: UtilityService) {
    this.utility.updatePageSEO(
      'FAQ | Buy and Sell your NFT, and NFT Money. NFT Collections, Crypto artworks.',
      'At Defy, we work every day to solve NFT Trading problems.'
    );
  }

  ngOnInit(): void {}
}
