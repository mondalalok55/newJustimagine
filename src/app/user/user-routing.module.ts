import { ForgetPasswordPage } from './forget-password/forget-password.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login/login.page';
import { RegistrationPage } from './registration/registration.page';
import { OtpVerificationPage } from './otp-verification/otp-verification.page';
//import { environment } from '../environments/environment';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    redirectTo: 'registration',
    pathMatch: 'full'
  },
  {
    path: 'otpVerification',
    redirectTo: 'otpVerification',
    pathMatch: 'full'
  },
  {
    path: 'forgetPassword',
    redirectTo: 'forgetPassword',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginPage
  },
  {
    path: 'registration',
    component:RegistrationPage
  },
  {
    path: 'otpVerification',
    component:OtpVerificationPage
  },
  {
    path: 'forgetPassword',
    component:ForgetPasswordPage
  }
];
@NgModule({
  declarations: [LoginPage,RegistrationPage,OtpVerificationPage,ForgetPasswordPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
