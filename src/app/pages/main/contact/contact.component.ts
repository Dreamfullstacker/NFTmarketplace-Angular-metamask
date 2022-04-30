import { Component, OnInit } from '@angular/core';
import { ContactService, UtilityService } from '../../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(
    private _ContactService: ContactService,
    private utility: UtilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.utility.updatePageSEO(
      'Contact Us | Buy and Sell your NFT, and NFT Money. NFT Collections, Crypto artworks.',
      'At Defy, we work every day to solve NFT Trading problems.'
    );
  }

  contactForm: FormGroup;

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required],
    });
  }

  get getContactForm() {
    return this.contactForm.controls;
  }

  sendContactRequest() {
    this.utility.startLoader();
    this._ContactService.createContact(this.contactForm.value).subscribe(
      (res) => {
        this.contactForm.reset()
        this.utility.stopLoader();
        Swal.fire({
          icon: 'success',
          title: 'Congratulations!',
          text: 'Your request has been submitted successfully. We will get back to you.',
        });
      },
      (error) => {
        this.utility.stopLoader();
        this.utility.showErrorAlert('Error', error);
      }
    );
  }
}
