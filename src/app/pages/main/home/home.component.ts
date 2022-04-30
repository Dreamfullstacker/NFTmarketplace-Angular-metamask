import { Component,Injectable, OnInit } from '@angular/core';
import { UtilityService, AuthenticationService, ConnectService, NftService } from '../../../_services';
import {connectToWallet} from '../../../utils/web3';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
declare let window:any;

@Injectable({
  providedIn: 'root',
})

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private utility: UtilityService,private connectService: ConnectService) {
    
    this.utility.updatePageSEO(
      'NFT Marketplace | Buy and Sell your NFT, and NFT Money. NFT Collections, Crypto artworks.',
      'Buy, Sell and trade your NFTs and NFT Money Secured with blockchain.'
    );
  }

  walletAddres: any = '';

  async ngOnInit() {
    this.walletAddres = await this.connectService.getAddress();
  }
  async connectToWallet(){
    $('#connect_to_wallet').modal('hide');
   this.walletAddres = await this.connectService.getAddress();
  };
  connectWallet(){
    $('#connect_to_wallet').modal('show');
  }
}
