import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public readonly apiUrl = environment.API_BASE_URL;

  constructor(public http: HttpClient) {}

  // send contact request
  createContact(nftBody: Object) {
    return this.http.post(`${this.apiUrl}contacts`, nftBody).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
