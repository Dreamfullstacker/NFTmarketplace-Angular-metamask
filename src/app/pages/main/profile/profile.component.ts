import { Component, OnInit } from '@angular/core';
import { UserService, UtilityService, NftService, ConnectService } from '../../../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../../_helpers/mustMatch.validator';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from 'src/app/_components/header/header.component';
@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [HeaderComponent],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private nftService: NftService,
    private connectService: ConnectService,
    private headerComponent: HeaderComponent
  ) {}

  // get user id from localstorage
  userId = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))['id']
    : '';
  userData = JSON.parse(localStorage.getItem('user'));
  userProfile: any = {};
  profileForm: FormGroup;
  passwordForm: FormGroup;
  profilePicForm: FormGroup;
  uriResponse: any = [];
  walletAddres: string = '';
  imgBaseUrl = environment.IMG_BASE_URL;

  async ngOnInit() {
     console.log(this.headerComponent);
    this.walletAddres = localStorage.getItem('walletAddress');
    // intialize Password form
    this.passwordForm = this.formBuilder.group(
      {
        // old_password: [null, Validators.required],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirm_password: [
          null,
          [Validators.required, Validators.minLength(6)],
        ],
      },
      {
        validator: [MustMatch('password', 'confirm_password')],
      }
    );

    this.profilePicForm = this.formBuilder.group({
      profilePic: [Validators.required],
    });

    // intialize Profile form
    this.profileForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      about_us: [null, [Validators.required]],
      fb_link: [null],
      twitter_link: [null],
      opensea_link: [null],
    });

    await this.connectService.getUserBalance();
    this.getUserProfile();
  }

  get getPasswordForm() {
    return this.passwordForm.controls;
  }

  get getProfileForm() {
    return this.profileForm.controls;
  }

  getUserProfile() {
    var self = this;

    this.utility.startLoader();
    this.userService
      .getUserProfileInfo(self.walletAddres.toLocaleLowerCase())
      .subscribe(
        (res) => {
          this.userProfile = res;
          this.utility.updatePageSEO(
            this.userProfile.user.name + ' | NFT Marketplace',
            this.userProfile.user.name + ' | NFT Marketplace'
          );
          this.profileForm.patchValue({
            name: this.userProfile.user.name,
            email: this.userProfile.user.email,
            about_us: this.userProfile.user.about_us,
            fb_link: this.userProfile.user.fb_link,
            twitter_link: this.userProfile.user.twitter_link,
            opensea_link: this.userProfile.user.opensea_link,
          });
          this.utility.stopLoader();
        },
        (error) => {
          this.utility.stopLoader();
          this.utility.showErrorAlert('Error', error);
        }
      );
  }

  changePasswordAction() {
    this.updateProfile({ password: this.passwordForm.value.password });
    this.passwordForm.reset();
  }

  updateProfileAction() {
    this.updateProfile(this.profileForm.value);
  }

  updateProfile(value) {
    this.utility.startLoader();
    this.userService.updateUser(this.userId, value).subscribe(
      (res) => {
        this.getUserProfile();
        this.utility.showSuccessAlert(
          'Success',
          'User Information Updated Succesfully'
        );
        this.utility.stopLoader();
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
  convertAmount(item: any) {
    return item.toFixed(5);
  }

  fileChangeEvent(e: File[], type: string) {
    this.utility.startLoader();
    this.userService.uploadPicture(e[0], type).subscribe(
      (res) => {
        this.utility.showSuccessAlert(
          'Success',
          'User Information Updated Succesfully'
        );
        this.utility.stopLoader();
        this.userProfile.user = res;
        if (type === 'profile') {
          this.userData['profile_pic'] = res['profile_pic'];
          this.headerComponent.userPic =
            environment.IMG_BASE_URL + res['profile_pic'];          
        } else {
          this.userData['cover_pic'] = res['cover_pic'];
        }
        localStorage.setItem('user', JSON.stringify(this.userData));
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
