import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var role = JSON.parse(localStorage.getItem('user'))
      ? JSON.parse(localStorage.getItem('user'))['role']
      : '';
    
    if (role === 'artist' || role === 'user') {
      return true;
    }
    return false;
  }
}
