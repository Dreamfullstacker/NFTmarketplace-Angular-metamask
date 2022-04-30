import { Component, OnInit } from '@angular/core';
import {
  UtilityService,
  NftService,
  ConnectService,
} from '../../../_services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const IpfsHttpClient = require('ipfs-http-client');
const ipfs = new IpfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});
import Swal from 'sweetalert2';

@Component({
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.css'],
})
export class CreateNftComponent implements OnInit {
  constructor(
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private nftService: NftService,
    private connectService: ConnectService
  ) {}

  createForm: FormGroup;

  ngOnInit(): void {
    // intialize form
    this.createForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
      price: [null, [Validators.required]],
      category: [null, [Validators.required]],
      link: [null],
    });
  }

  get getCreateForm() {
    return this.createForm.controls;
  }

  convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  upload() {
    const file = (<HTMLInputElement>(
      document.getElementById('sign__file-upload')
    )).files[0];
    console.log(file);
    
    if (file.size <= 102400000){
      var self = this;
      const reader = new FileReader();
      let byteArray;

      reader.addEventListener(
        'loadend',
        async function () {
          // convert image file to base64 string

          byteArray = self.convertDataURIToBinary(reader.result);
          self.utility.startLoader('Uploading document....');
          var result = await ipfs.add(byteArray);
          self.utility.startLoader(
            'Document uploaded sucessfully. Please wait...'
          );
          self.utility.startLoader(
            'Data encryption in progress. Please wait...'
          );
          var fianalJSON = self.createForm.value;
          fianalJSON[
            'image'
          ] = `https://gateway.ipfs.io/ipfs/${result['path']}`;
          fianalJSON['status'] = `AVAILABLE`;
          fianalJSON['fileType'] = file.type;
          fianalJSON['currentOwnerWalletAddress'] = self.connectService.account;
          self.utility.startLoader('Almost finished. Please wait...');
          self.createNFT(fianalJSON);
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
       this.utility.showErrorAlert('Error', 'File size must be less than 100Mb');
    }

    
      
  }

  createNFT(data) {
    var self = this;
    this.utility.startLoader();
    this.nftService.createNft(data).subscribe(
      (res) => {
        this.utility.stopLoader();
        Swal.fire({
          icon: 'success',
          title: 'Congratulations!',
          text: 'You have minted NFT successfully.',
        }).then((result) => {
          this.router.navigate(['/manage-profile']);
        });
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
