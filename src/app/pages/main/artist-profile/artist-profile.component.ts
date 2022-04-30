import { Component, OnInit } from '@angular/core';
import {
  UserService,
  UtilityService,
} from '../../../_services';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css'],
})
export class ArtistProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private utility: UtilityService,
    private activatedRoute: ActivatedRoute
  ) {}
  userProfile: any;
  imgBaseUrl = environment.IMG_BASE_URL;

  ngOnInit(): void {
    this.getArtistProfile();
  }

  getArtistProfile() {
    this.utility.startLoader();
    this.userService
      .getArtistProfile(this.activatedRoute.snapshot.paramMap.get('artist_id'))
      .subscribe(
        (res) => {
          this.userProfile = res;
          this.utility.stopLoader();
        },
        (error) => {
          this.utility.stopLoader();
          this.utility.showErrorAlert('Error', error);
        }
      );
  }
}
