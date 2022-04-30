import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, UtilityService } from '../../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from '../../../_helpers/mustMatch.validator';
@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthenticationService, private utility: UtilityService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
      
    this.utility.updatePageSEO(
      'Reset Password | NFT Marketplace',
      'Reset Password | NFT Marketplace',
      '',
      ''
    );
  }
  
  public form: FormGroup;
  public token: string = '';

  ngOnInit(): void {

    if (this.activatedRoute.snapshot.queryParamMap.get('token')) {
      this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
    } else {
      this.utility.showErrorAlert('Error', 'Something Went wrong');
      this.router.navigate(['auth/login']);
    }
    
    this.form = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: [MustMatch('password', 'confirm_password')],
      });
  }

  get getForm() {
    return this.form.controls;
  }

  submitAction() {
    if (this.form.valid) {
      this.utility.startLoader()
      this.authService.resetPassword(this.form.value.password, this.token).subscribe(
        (res) => {
          this.utility.stopLoader()
          this.form.reset()
          this.utility.showSuccessAlert('Success!', 'Your Password has been reset successfully', );
          this.router.navigate(['auth/login']);
        },
        (error) => {
          this.utility.stopLoader()
          this.utility.showErrorAlert('Error', error);
        }
      );
    }
  }

}
