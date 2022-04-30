import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService, UtilityService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthenticationService, private utility: UtilityService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
      
    this.utility.updatePageSEO(
      'Login | NFT Marketplace',
      'Login | NFT Marketplace',
      '',
      ''
    );
  }
  
  form: FormGroup;
  token: string;

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParamMap.get('token')) {
      this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
      this.emailVerification()
    }
    
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      password: [null, Validators.required],
    });
  }

  get getForm() {
    return this.form.controls;
  }

  loginAction() {
    if (this.form.valid) {
      this.utility.startLoader()
      this.authService.login(this.form.value.email, this.form.value.password).subscribe(
        (res) => {
          this.utility.stopLoader()
          if (
            res['user']['role'] === 'user' ||
            res['user']['role'] === 'artist'
          ) {
            this.utility.showSuccessAlert('Success!', 'Logged in successfully');
            if (this.activatedRoute.snapshot.queryParamMap.get('returnUrl')) {
              this.router.navigate([
                this.activatedRoute.snapshot.queryParamMap.get('returnUrl'),
              ]);
            } else {
              this.router.navigate(['home']);
            }
          } else {
            this.utility.showErrorAlert(
              'Error',
              'You have not permission to access'
            );
          }
        },
        (error) => {
          this.utility.stopLoader()
          this.utility.showErrorAlert('Error', error);
        }
      );
    }
  }

  emailVerification() {
      this.utility.startLoader()
      this.authService.emailVerifcation(this.token).subscribe(
        (res) => {
          this.utility.stopLoader()
          this.utility.showSuccessAlert('Success!', 'Email verified successfully! Now you can login', );
          this.router.navigate(['auth/login']);
       
        },
        (error) => {
          this.utility.stopLoader()
          this.utility.showErrorAlert('Error', error);
        }
      );
  }

}
