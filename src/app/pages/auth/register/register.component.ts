import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, UtilityService } from '../../../_services';
import { Router } from '@angular/router';


@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 constructor(private authService: AuthenticationService, private utility: UtilityService, private formBuilder: FormBuilder, private router: Router) {
      
    this.utility.updatePageSEO(
      'Register | NFT Marketplace',
      'Register | NFT Marketplace',
      '',
      ''
    );
  }
  
  form: FormGroup;

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [null, Validators.required],
      terms: [null, [Validators.required]],
      role: ['user', [Validators.required]],
      // fb_link: [null, [Validators.required]],
      // twitter_link: [null, [Validators.required]],
      // opensea_link: [null, [Validators.required]],
    });

    // this.getAccountAndBalance()


  }

  get getForm() {
    return this.form.controls;
  }

  registerAction() {
    if (this.form.valid) {
      this.utility.startLoader()
      this.authService.register(this.form.value.name, this.form.value.email, this.form.value.password, this.form.value.role).subscribe(
        (res) => {
          this.utility.stopLoader()
          this.utility.showSuccessAlert('Success!', 'User has been registered successfully! Please check your email for email verification' );
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
