import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { validate } from 'json-schema';
import { log } from 'util';
import { IonicToastService } from './../../services/ionic-toast.service';
import { MenuController} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  postData = {
    username: '',
    password: ''
    };
  login: FormGroup;
  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private ionicToastService: IonicToastService,
    public menuCtrl: MenuController
  ) { 
  }
ngOnInit(){
  this.login = this.formBuilder.group({
    username: ['7427936884',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[0-9]*$/)
    ]],
    password: ['123456', 
    Validators.required
  ]
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
validatePhone(event){
  console.log('validatePhone(  running >>>> ', event.target.value);
  let rawval = event.target.value;
  let newdata = rawval.replace(/[^0-9]+/g, '');
  event.target.value = newdata;
  this.login.patchValue({
    username: newdata
  }); 
}  
minMaxLength(event){
  console.log('minMaxLength(  running >>>> ', event.target.value);
  let rawval = event.target.value;
  let username_length=rawval.length;
  console.log(username_length);
  let newdata = "";
  if(username_length!=10){
  event.target.value = newdata;
  this.login.patchValue({
    username: newdata
  }); 
  this.ionicToastService.presentToast("Username Must Be 10 Characters Long","danger","2000");
}
} 
loginAction() {
     console.log('====================================');
     console.log(this.login.invalid);
     console.log('====================================');
     console.log('form loginAction()');
     console.log( this.login.value);
     let flag=this.login.invalid;
     if(!flag){
     let url = this.apiService.allApiEndPoints[0];
     this.apiService.sendHttpCall(url,this.login.value,"post").subscribe(
      (res: any) => {
      console.log(res);
      if (res.status==true) {
      // Storing the User data.
      let data=res.data;
      localStorage.setItem("id", data.id);
      localStorage.setItem("name", (data.first_name+" "+data.last_name));
      localStorage.setItem("email", data.email);
      localStorage.setItem("phone", data.phone);
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedin", "true");
      //this.showMyToast();
      this.ionicToastService.presentToast("Login Successful!","success","2000");
      this.router.navigate(['home']);
      } else {
        this.ionicToastService.presentToast(res.message,"danger","2000");
      }
      },
      (error: any) => {
      console.log('Network Issue.');
      }
      );
    }
    else{
      if(this.login.value.username.length!=10){
        this.ionicToastService.presentToast("Username Must Be 10 Characters Long","danger","2000");
      }
      else if(this.login.value.password.length!=6){
        this.ionicToastService.presentToast("Password Atleast 6 Characters Long","danger","2000");
      }
      else{
      this.ionicToastService.presentToast("Please Provide All Required Fields!","danger","2000");
      }
    }
}
gotoRegistrationPage() {
  this.router.navigate(['user/registration']);
}
gotoForgetPasswordPage() {
  this.router.navigate(['user/forgetPassword']);
}
}
