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
ngOnInit(){
  this.registration = this.formBuilder.group({
    first_name: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]*$/)
    ]],
    last_name: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]*$/)
    ]],
    phone: ['',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[0-9]*$/)
    ]],
    email: ['',[
      Validators.required,
      Validators.pattern(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )
    ]],
    password: ['',[
      Validators.required,
      Validators.minLength(6)
      //Validators.maxLength(10)
    ]],
    confirm_password: ['',[
      Validators.required,
      Validators.minLength(6),
      //Validators.maxLength(10)
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
validatePhone(event){
  //console.log('validatePhone(  running >>>> ', event.target.value);
  let rawval = event.target.value;
  let newdata = rawval.replace(/[^0-9]+/g, '');
  event.target.value = newdata;
  this.registration.patchValue({
    phone: newdata
  }); 
} 
// validateEmail(event){
//   console.log('validatePhone(  running >>>> ', event.target.value);
//   let rawval = event.target.value;
//   let newdata = rawval.replace(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, '');
//   event.target.value = newdata;
//   this.registration.patchValue({
//     email: newdata
//   }); 
// } 
ValidateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
validateName(event){
 // console.log('validateName(  running >>>> ', event.target.value);
  let rawval = event.target.value;
  let newdata = rawval.replace(/[^a-zA-Z]+/g, '');
  event.target.value = newdata;

  this.registration.patchValue({
  [event.target.name]: newdata
  });
 }
registrationAction() {
  console.log('form registrationAction()');
  console.log( this.registration.value);
  let flag=this.registration.invalid;
  if(!flag){
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
      this.ionicToastService.presentToast(res.message,"danger","2000");
    }
    },
    (error: any) => {
    console.log('Network Issue.');
    }
    );
  }
  else{
  if(this.registration.value.first_name=="" || this.registration.value.first_name==null ){
    this.ionicToastService.presentToast("First Name Must Not Be Empty","danger","2000");
  }
  else if(this.registration.value.last_name=="" || this.registration.value.last_name==null ){
    this.ionicToastService.presentToast("Last Name Must Not Be Empty","danger","2000");
  }
  else if(this.registration.value.phone=="" || this.registration.value.phone==null|| this.registration.value.phone.length!=10){
    this.ionicToastService.presentToast("Invalid Phone Number","danger","2000");
  }
  else if(this.registration.value.email=="" ){
    this.ionicToastService.presentToast("Email Must Not Be Empty","danger","2000");
  }
  else if(!(this.ValidateEmail(this.registration.value.email))){
    this.ionicToastService.presentToast("Invalid Email","danger","2000");
  }
  else if(this.registration.value.password.length!=6){
    this.ionicToastService.presentToast("Password Atleast 6 Characters Long","danger","2000");
  }
  else if(this.registration.value.password!=this.registration.value.confirm_password){
    this.ionicToastService.presentToast("Password & Confirm Password Must Be Matched","danger","2000");
  }
  else{
  //this.ionicToastService.presentToast("Please Provide All Required Fields!","danger","2000");
  //this.ionicToastService.presentToast("Password & Confirm Password Must Be Matched","danger","2000");
  }
}
}
gotoLoginPage() {
this.router.navigate(['user']);
}
}
