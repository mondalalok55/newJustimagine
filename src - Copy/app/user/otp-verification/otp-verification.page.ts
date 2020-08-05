import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { validate } from 'json-schema';
import { log } from 'util';
import { IonicToastService } from './../../services/ionic-toast.service';
//import { MenuController } from 'ionic-angular';
import { MenuController} from '@ionic/angular';
//import { exists } from 'fs';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.page.html',
  styleUrls: ['./otp-verification.page.scss'],
})
export class OtpVerificationPage implements OnInit {
  inserted_id:string;
  otpVerification: FormGroup;
  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private ionicToastService: IonicToastService,
    public menuCtrl: MenuController
  ) { }

otpVerificationAction() {
    //console.log('form registrationAction()');
    console.log( this.otpVerification.value);
    let url = this.apiService.allApiEndPoints[2];
    //console.log(url);
    this.apiService.sendHttpCall(url,this.otpVerification.value,"post").subscribe(
      (res: any) => {
      console.log(res);
      if (res.status==true) {
      // Storing the User data.
      let data=res.data;
      localStorage.setItem("id", data.id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("phone", data.phone);
      localStorage.setItem("role", data.role);
      localStorage.setItem("isLoggedin", "true");
      console.log(res.data);
      this.ionicToastService.presentToast(res.message,"success","2000");
      this.router.navigate(['home']);
      } else {
      console.log('incorrect password.');
      }
      },
      (error: any) => {
      console.log('Network Issue.');
      }
      );
}
gotoLoginPage() {
  this.router.navigate(['user']);
}
ngOnInit(){
  this.otpVerification = this.formBuilder.group({
    otp: ['', Validators.required],
    insert_id: ['', Validators.required],
   
  })
}
ionViewWillEnter(){
  this.inserted_id=localStorage.getItem("id");
  this.menuCtrl.enable(false);
  let is_loggedin=localStorage.getItem("isLoggedin");
  if(is_loggedin){
    this.router.navigate(['home']);
  }
  else{

  }
}

}
