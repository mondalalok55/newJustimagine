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
  forgetPasswordAction() {
    console.log( this.forgetPassword.value);
    let url = this.apiService.allApiEndPoints[3];
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
ngOnInit(){
  this.forgetPassword = this.formBuilder.group({
    user_name: ['', Validators.required]
   
  })
}
gotoLoginPage() {
  this.router.navigate(['user']);
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

}
