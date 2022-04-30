import { Component, OnInit } from '@angular/core';
import {
  NftService,
  UtilityService,
  ConnectService,
  UserService
} from '../../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;
import { environment } from './../../../../environments/environment';

@Component({
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.css'],
})
export class NftDetailComponent implements OnInit {
  constructor(
    private nftService: NftService,
    private userService: UserService,
    private utility: UtilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private connectService: ConnectService
  ) {}

  // get user id from localstorage
  userId = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))['id']
    : '';
  user = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))
    : '';
  imgBaseUrl = environment.IMG_BASE_URL;
  nft: any = {};
  platformFee = 5;

  ngOnInit(): void {
    this.getNftById();
    this.getSettingInfo();
  }

  getNftById() {
    this.utility.startLoader();
    this.nftService
      .getNftById(this.activatedRoute.snapshot.paramMap.get('product_id'))
      .subscribe(
        (res) => {
          this.nft = res;
          this.utility.updatePageSEO(
            this.nft.name + ' | NFT Marketplace',
            this.nft.description
          );
          this.utility.stopLoader();
        },
        (error) => {
          console.log(error);
          this.utility.stopLoader();
          this.utility.showErrorAlert('Error', error);
        }
      );
  }

  openBuyNow() {
    this.checkAuth('#nft-wallet');
  }

  checkAuth(id) {
    if (this.userId === '') {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url },
      });
    } else {
      $(id).modal('show');
    }
  }

  // check nft status by nftId
  checkNftStatus() {
    this.utility.startLoader();
    this.nftService.checkNftStatus(this.nft.id).subscribe(
      (res) => {
        const resp: any = res;
        if (resp.status === 'LOCKED' && resp.lockedUserId === this.userId) {
          this.buyNFT();
        } else {
          this.utility.showErrorAlert(
            'Error',
            'This NFT is not available currently.'
          );
        }
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }

  async buyNFT() {
    this.utility.startLoader();
    const data = await this.connectService.buyToken(
      this.nft.price,
      this.nft.currentOwnerWalletAddress,
      this.platformFee
    );
    console.log(data);
    if (data) {
      Object.assign(data, {
        nft: this.nft.id,
        user: this.userId,
        platformFee: this.platformFee,
      });
      this.nftService.buyNft(data).subscribe(
        (res) => {
          console.log(res);
          $('#nft-wallet').modal('hide');
          this.utility.stopLoader();
          Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'Your transaction was successfully.',
          }).then((result) => {
            this.router.navigate(['/marketplace']);
          });
        },
        (error) => {
          this.utility.stopLoader();
          this.utility.showErrorAlert('Error', error);
        }
      );
    } else {
      this.utility.stopLoader();
      this.releaseNft();
      this.utility.showErrorAlert(
        'Error',
        'MetaMask Tx Signature: User denied transaction signature'
      );
    }
  }

  // release nft by nftId
  releaseNft() {
    this.utility.startLoader();
    this.nftService.releaseNft(this.nft.id).subscribe(
      (res) => {
        this.utility.stopLoader();
        console.log(res);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }

  // get setting info
  getSettingInfo() {
    this.utility.startLoader();
    this.userService.getSettingInfo().subscribe(
      (res) => {
        this.utility.stopLoader();
        this.platformFee = res['platformFee'];
        console.log(res);
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
