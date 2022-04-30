import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../_services';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private utility: UtilityService) {
     this.utility.updatePageSEO( '404 Not Found | NFT', '404 Not Found | NFT', '', '')
  }

  year = new Date().getFullYear()

  ngOnInit(): void {
  }

}
