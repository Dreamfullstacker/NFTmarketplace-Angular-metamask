import { Component, OnInit } from '@angular/core';
import { UtilityService } from './../../../_services/utility.service';
@Component({
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  constructor(private utility: UtilityService) {
     this.utility.updatePageSEO(
       'Defy Blogs | NFT News, Analysis, Guides, and Updates | nft.defydefi.io',
       'Check out the latest happenings and updates.'
     );
  }

  ngOnInit(): void {}
}
