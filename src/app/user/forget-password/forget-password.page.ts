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
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  forgetPassword: FormGroup;
  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private ionicToastService: IonicToastService,
    public menuCtrl: MenuController
  ) { }
ngOnInit(){
  this.forgetPassword = this.formBuilder.group({
    user_name: ['',[
      Validators.required,
      Validators.pattern(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )
    ]]
   
  })
}
ionViewWillEnter(){
  this.menuCtrl.enable(false);
  let is_loggedin=localStorage.getItem("isLoggedin");
  if(is_loggedin){
    this.router.navigate(['home']);
  }
  else{

  }
}
gotoLoginPage() {
  this.router.navigate(['user']);
}
ValidateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
forgetPasswordAction() {
  console.log( this.forgetPassword.value);
  let url = this.apiService.allApiEndPoints[3];
  let flag=this.forgetPassword.invalid;
  if(!flag){
  this.apiService.sendHttpCall(url,this.forgetPassword.value,"post").subscribe(
    (res: any) => {
    console.log(res);
    if (res.status==true) {
    // Storing the User data.
    this.ionicToastService.presentToast(res.message,"success","2000");
    this.router.navigate(['user/login']);
    } else {
      this.ionicToastService.presentToast(res.message,"danger","2000");
    }
    },
    (error: any) => {
      this.ionicToastService.presentToast("Network Issue","danger","2000");
    }
    );
  }
  else{
    if(this.forgetPassword.value.user_name=="" ){
      this.ionicToastService.presentToast("Email Must Not Be Empty","danger","2000");
    }
    else if(!(this.ValidateEmail(this.forgetPassword.value.user_name))){
      this.ionicToastService.presentToast("Invalid Email","danger","2000");
    }
    else{

    }
  }
}
}
