import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { validate } from 'json-schema';
import { log } from 'util';
import { IonicToastService } from './../../services/ionic-toast.service';
//import { MenuController } from 'ionic-angular';
import { MenuController} from '@ionic/angular';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  postData = {
    username: '',
    password: ''
    };
  registration: FormGroup;
  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private ionicToastService: IonicToastService,
    public menuCtrl: MenuController
  ) { }
registrationAction() {
    //console.log('form registrationAction()');
    console.log( this.registration.value);
    let url = this.apiService.allApiEndPoints[1];
    console.log(url);
    this.apiService.sendHttpCall(url,this.registration.value,"post").subscribe(
      (res: any) => {
      console.log(res);
      if (res.status==true) {
      // Storing the User data.
      let data=res.data;
      localStorage.setItem("id", res.inserted_id);
      //console.log(data);
      //this.showMyToast();
      this.ionicToastService.presentToast(res.message,"success","2000");
      this.router.navigate(['user/otpVerification']);
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
  this.registration = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required]
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

}
