import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-error-field',
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.css']
})
export class ErrorFieldComponent implements OnInit {
  @Input() errorMsg: any;
  constructor() { }

  ngOnInit(): void {
    
  }

  getErrorMessage(response) {    
    if(response.touched){
      if (response.errors.required) {
        return 'This field is required';
      } else if (response.errors.pattern) {
        return 'This field should be in valid format';
      } else if (response.errors.minlength) {
        return `${this.getControlName(response)} should be minimum ${
          response.errors.minlength.requiredLength
        } character`;
      } else if (response.errors.max) {
        return `${this.getControlName(response)} should be maximum ${
          response.errors.max.max
        }`;
      } else if (response.errors.min) {
        return `${this.getControlName(response)} should be minimum ${
          response.errors.min.min
        }`;
      } else if (response.errors.mustMatch) {
        return `Password & Confirm password does not match`;
      }
    }
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return this.titleCase(Object.keys(formGroup).find(name => c === formGroup[name])) || null;
  }

  titleCase(string) {
    var sentence = string.toLowerCase().split("_");
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    
    return sentence.join(" ");
  }
}
