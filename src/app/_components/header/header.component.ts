import { environment } from 'src/environments/environment';
import { Component, Injectable, OnInit } from '@angular/core';
import { UtilityService, AuthenticationService, ConnectService, NftService } from '../../_services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
declare let window:any;

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private nftService: NftService,
    private connectService: ConnectService,
  ) {}

  userName: string;
  userPic: string =
    JSON.parse(localStorage.getItem('user')) &&
    JSON.parse(localStorage.getItem('user'))['profile_pic']
      ? environment.IMG_BASE_URL +
        JSON.parse(localStorage.getItem('user'))['profile_pic']
      : '/assets/img/avatars/avatar.jpg';
  userRole: string;
  searchTerm: string;
  balance: any = 0;
  walletAddres: any = '';
  searchForm: FormGroup;
  searchResults: any = [];

  async ngOnInit() {
    console.log(localStorage.getItem('user'));
    this.searchForm = this.formBuilder.group({
      search: [Validators.required],
    });
    this.userName = JSON.parse(localStorage.getItem('user'))
      ? JSON.parse(localStorage.getItem('user')) ['name']
      : '';
    this.userRole = JSON.parse(localStorage.getItem('user'))
      ? JSON.parse(localStorage.getItem('user'))['role']
      : '';

   this.walletAddres = await this.connectService.getAddress();
  }
  async connectToWallet(){
    $('#connect_to_wallet').modal('hide');
   this.walletAddres = await this.connectService.getAddress();
  };
  async ngAfterViewInit() {
//    this.walletAddres = await this.connectService.getAddress();
  }
  connectWallet() {
    $('#connect_to_wallet').modal('show');
  }

  logoutAction() {
    this.authService.logout().subscribe(
      (res) => {
        this.utility.stopLoader();
        this.utility.showSuccessAlert('Success', 'Logout Successfully');
        window.location.reload();
      },
      (error) => {
        localStorage.removeItem('user');
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
        window.location.reload();
      }
    );
  }

  search() {
    if (this.searchTerm !== '') {
      this.router.navigate(['search', this.searchTerm]);
    }
  }

  redirect(id) {
    console.log(id);
    
      this.router.navigate(['/marketplace', id]);
  }

  setSearchValue(text) {
    this.searchTerm = text;
    if (text !== '') {
      this.searchResult();
    } else {
      this.searchResults = [];
    }
  }

  searchResult() {
    this.nftService.searchNft(this.searchTerm).subscribe(
      (res) => {
        this.searchResults = [];
        this.searchResults = res;
      },
      (error) => {
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}  
