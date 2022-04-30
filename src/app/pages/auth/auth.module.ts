import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ErrorFieldComponent } from '../../_components/error-field/error-field.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { SharedModule } from './../../_components/shared/shared.module';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [AuthComponent, ForgotPasswordComponent, ResetPasswordComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
