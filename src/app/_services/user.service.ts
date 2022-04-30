import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  public readonly apiUrl = environment.API_BASE_URL;

  constructor(public http: HttpClient, public sanitizer: DomSanitizer) {
    // set token if saved in local storage
  }

  // Get user by id
  getUserById(userId: String) {
    return this.http.get(`${this.apiUrl}users/${userId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Get user profile
  getUserProfileInfo(walletAddress: string) {
    return this.http
      .get(`${this.apiUrl}users/user-profile?walletAddress=${walletAddress}`)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  // Add New User
  updateUser(userId: String, userBody: Object) {
    return this.http.patch(`${this.apiUrl}users/${userId}`, userBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Add Picture
  uploadPicture(file: File, type: any) {
    var fd = new FormData();
    fd.append('file', file);
    fd.append('type', type);
    return this.http.post(`${this.apiUrl}users/update-picture`, fd).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // get setting info
  getSettingInfo() {
    return this.http.get(`${this.apiUrl}users/get-admin-setting`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // get setting info
  getArtistProfile(userId) {
    return this.http
      .get(`${this.apiUrl}users/get-artist-profile/${userId}`)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
