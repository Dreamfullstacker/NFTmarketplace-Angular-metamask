import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NftService {
  public readonly apiUrl = environment.API_BASE_URL;
  // get user id from localstorage
  userId = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))['id']
    : '';
  constructor(public http: HttpClient) {}

  // create New Nft
  createNft(nftBody: Object) {
    return this.http.post(`${this.apiUrl}nfts`, nftBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // buy New Nft
  buyNft(nftBody: Object) {
    return this.http.post(`${this.apiUrl}nfts/buy-nft`, nftBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // search  Nft
  searchNft(text: String) {
    return this.http.get(`${this.apiUrl}nfts/search-nft/${text}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // Get all nft list role wise
  getNfts(isFeatured : boolean = false) {
    return this.http
      .get(`${this.apiUrl}nfts/available?isFeatured=${isFeatured}`)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  // Get nft by id
  getNftById(nftId: String) {
    return this.http.get(`${this.apiUrl}nfts/${nftId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // update  Nft
  updateNft(nftId: String, nftBody: Object) {
    return this.http.patch(`${this.apiUrl}nfts/${nftId}`, nftBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // check nft status
  checkNftStatus(nftId: String) {
    return this.http.get(`${this.apiUrl}nfts/check-nft-status/${nftId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  // release nft
  releaseNft(nftId: String) {
    return this.http.get(`${this.apiUrl}nfts/release-nft/${nftId}`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
