import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, UtilityService } from '../../../_services';
import { Router } from '@angular/router';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService: AuthenticationService, private utility: UtilityService, private formBuilder: FormBuilder, private router: Router) {
      
    this.utility.updatePageSEO(
      'Forgot Password | NFT Marketplace',
      'Forgot Password | NFT Marketplace',
      '',
      ''
    );
  }
  
  form: FormGroup;

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]]
    });
  }

  get getForm() {
    return this.form.controls;
  }

  submitAction() {
    if (this.form.valid) {
      this.utility.startLoader()
      this.authService.sendPasswordResetEmail(this.form.value.email).subscribe(
        (res) => {
          this.utility.stopLoader()
          this.utility.showSuccessAlert('Success!', 'Email Sent successfully', );
          this.form.reset()
        },
        (error) => {
          this.utility.stopLoader()
          this.utility.showErrorAlert('Error', error);
        }
      );
    }
  }
}
