import { Component, OnInit } from '@angular/core';
import { UtilityService } from './../../../_services/utility.service';
@Component({
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.css'],
})
export class TermConditionComponent implements OnInit {
  constructor(private utility: UtilityService) {
    this.utility.updatePageSEO(
      'Terms & Condition | Buy and Sell your NFT, and NFT Money. NFT Collections, Crypto artworks.',
      'At Defy, we work every day to solve NFT Trading problems.'
    );
  }

  ngOnInit(): void {}
}
