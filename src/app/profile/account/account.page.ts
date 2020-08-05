// import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { validate } from 'json-schema';
import { log } from 'util';
import { IonicToastService } from './../../services/ionic-toast.service';
//import { MenuController } from 'ionic-angular';
import { MenuController,AlertController} from '@ionic/angular';
//import { NavController, Platform, AlertController, MenuController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  updateAccount: FormGroup;
  user_details: any;
  country: any = [];
  state: any = [];
  city: any = [];
  count:any;
  //user_details:any;
  name: void;
  account_details: any;
  token:any;
  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private ionicToastService: IonicToastService,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) {
  }
ngOnInit() {
    this.updateAccount = this.formBuilder.group({
      first_name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/)
      ]],
      last_name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/)
      ]],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      country_id: [''],
      state_id: [''],
      city_id: [''],
      pin: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(6),
        Validators.maxLength(6)
      ]],
      user_id: ['', Validators.required],
      user_role: ['', Validators.required]
    })
}
ionViewWillEnter(){
  this.menuCtrl.enable(true);
  //let check_token=localStorage.getItem("token");
  //localStorage.setItem("token",check_token);
  //this.token=1;
  //if(this.token){
this.fetchProfile();
  //}
   //console.log(this.user_details);
   //this.updateAccount.patchValue({country_id:this.user_details['country_id'], state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})

   //this.updateAccount.patchValue({country_id:this.user_details['country_id'], state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})
}
ionViewDidEnter (){ 
    //this.fetchProfile();
    //console.log(this.user_details);
    //this.updateAccount.patchValue({country_id:this.user_details['country_id'], state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})
} 
validateName(event){
  console.log('validateName(  running >>>> ', event.target.value);
  let rawval = event.target.value;
  let newdata = rawval.replace(/[^a-zA-Z]+/g, '');
  event.target.value = newdata;

  this.updateAccount.patchValue({
    [event.target.name]: newdata
  });
}
removeSpace(event){
  let rawval = event.target.value;
  console.log('start',rawval,'end');
  rawval = this.getProperName(rawval.split(' '));
  console.log('start',rawval,'end');
  event.target.value = rawval.join(' ');
  console.log('start',rawval.join(' '),'end');
  this.updateAccount.patchValue({
    name: rawval.join(' ')
  });
 }
getProperName(arr: Array<any>){
   let val = [];
  arr.forEach(item => {
    if(item && item.length > 0){
      item = item.trim();
      val.push(item);
    }    
  });
  console.log('returning arr  ', val);
  return val;
}
validatePin(event){
  //console.log('validatePhone(  running >>>> ', event.target.value);
  let rawval = event.target.value;
  let newdata = rawval.replace(/[^0-9]+/g, '');
  event.target.value = newdata;
  this.updateAccount.patchValue({
    pin: newdata
  }); 
} 
fetchProfile() {
    let user_id=localStorage.getItem("id");
    let user_role=localStorage.getItem("role");
    localStorage.setItem("token",localStorage.getItem("token"));
    let check_token=localStorage.getItem("token");
    this.apiService.httpOptionsForToken= {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Accept': check_token
      })
    }
    if(check_token){
    let url = this.apiService.allApiEndPoints[4]+user_id+`/`+user_role;
    this.apiService.sendHttpCallWithToken(url,"","get").subscribe(
      (res: any) => {
       //console.log(res);
      if (res.status==true){
      // Storing the User data.
      this.user_details=res.data.user_data;
      console.log("Fetch User Details");
      console.log(this.user_details);
      // this.updateAccount.patchValue({country_id:res.data.user_data.country_id, state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})
      this.country=res.data.country;
      if(res.data.state){
      this.state=res.data.state;
      }
      if(res.data.city){
        this.city=res.data.city;
      }
      console.log("state: "+this.state);
      console.log("city: "+this.city);
      //this.city=res.data.city;
      //this.name = this.user_details['name'];
       //console.log(this.user_details);
      //this.ionicToastService.presentToast("Login Successful!","success","2000");
      //this.router.navigate(['home']);
      if(this.user_details.country_id){
        this.count=this.user_details.country_id;
        this.updateAccount.patchValue({
          country_id: this.user_details.country_id
        });
      }
      if(this.user_details.state_id){
        this.updateAccount.patchValue({
          state_id: this.user_details.state_id
        });
      }
      if(this.user_details.city_id){
        console.log("city_patch value");
        console.log(this.user_details.city_id);
        this.updateAccount.patchValue({
          city_id: this.user_details.city_id
        });
      }
      } else {
      this.ionicToastService.presentToast(res.message,"danger","2000");
      localStorage.setItem("id", "");
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
      localStorage.setItem("phone", "");
      localStorage.setItem("role", "");
      localStorage.setItem("isLoggedin", "");
      this.router.navigate(['user']);
      }
      },
      (error: any) => {
      //console.log(res);
      this.ionicToastService.presentToast("Network Issue","danger","2000");
      }
      );
    }
} 
getState(event) {
  let get_id=event.target.value;
  //console.log("state");
  //console.log(get_id);
  localStorage.setItem("get_id",get_id);
  let user_id=localStorage.getItem("id");
  let user_role=localStorage.getItem("role");
  var url = this.apiService.allApiEndPoints[5]+user_id+`/`+get_id+`/`+user_role;
  this.apiService.sendHttpCallWithToken(url,"","get").subscribe(
    (res: any) => {
     //console.log(res);
    if (res.status==true) {
    // Storing the User data.
    this.state=res.data.state;
    this.city=[];
    this.updateAccount.patchValue({
      city_id:""
    });
    //console.log("State");
    //console.log(res.data.state);
    
    } else {
      this.ionicToastService.presentToast(res.message,"danger","2000");
      localStorage.setItem("id", "");
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
      localStorage.setItem("phone", "");
      localStorage.setItem("role", "");
      localStorage.setItem("isLoggedin", "");
      this.router.navigate(['user']);
    }
    },
    (error: any) => {
    // console.log('Network Issue.');
    this.ionicToastService.presentToast("Network Issue","danger","2000");
    }
    );
} 
getCity(event) {
  let get_id=event.target.value;
 // console.log("City");
  //console.log(get_id);
  localStorage.setItem("get_id",get_id);
  let user_role=localStorage.getItem("role");
  //var url = this.apiService.allApiEndPoints[6];
  let user_id=localStorage.getItem("id");
  var url = this.apiService.allApiEndPoints[6]+user_id+`/`+get_id+`/`+user_role;
  this.apiService.sendHttpCallWithToken(url,"","get").subscribe(
    (res: any) => {
    // console.log(res);
    if (res.status==true) {
    // Storing the User data.
    this.city=res.data.city;
    //console.log("City");
   // console.log(res.data.city);
    this.updateAccount.patchValue({
      city_id:""
    });
    } else {
      this.ionicToastService.presentToast(res.message,"danger","2000");
      localStorage.setItem("id", "");
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
      localStorage.setItem("phone", "");
      localStorage.setItem("role", "");
      localStorage.setItem("isLoggedin", "");
      this.router.navigate(['user']);
    }
    },
    (error: any) => {
   // console.log('Network Issue.');
   this.ionicToastService.presentToast("Network Issue","danger","2000");
    }
    );
} 
updateAccountAction() {
  this.account_details=this.updateAccount.value;
  let name = this.account_details.name;
  let address1 = this.account_details.address1;
  let country_id = this.account_details.country_id;
  let state_id = this.account_details.state_id;
  let city_id = this.account_details.city_id;
  let pin = this.account_details.pin;
  let flag=this.updateAccount.invalid;
  if(!flag){
  let url = this.apiService.allApiEndPoints[7];
  console.log(url);
  this.apiService.sendHttpCall(url,this.updateAccount.value,"put").subscribe(
    (res: any) => {
    console.log(res);
    if (res.status==true) {
    // Storing the User data.
    // let data=res.data;
    // localStorage.setItem("id", res.inserted_id);
    //console.log(data);
    //this.showMyToast();
    this.ionicToastService.presentToast(res.message,"success","2000");
    //this.router.navigate(['user/otpVerification']);
    } else {
      this.ionicToastService.presentToast(res.message,"danger","2000");
      localStorage.setItem("id", "");
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
      localStorage.setItem("phone", "");
      localStorage.setItem("role", "");
      localStorage.setItem("isLoggedin", "");
      this.router.navigate(['user']);
    }
    },
    (error: any) => {
    //console.log('Network Issue.');
    this.ionicToastService.presentToast("Network Issue","danger","2000");
    }
    );
  }
  else{
    if(this.updateAccount.value.first_name=="" || this.updateAccount.value.first_name==null ){
      this.ionicToastService.presentToast("First Name Must Not Be Empty","danger","2000");
    }
    else if(this.updateAccount.value.last_name=="" || this.updateAccount.value.last_name==null ){
      this.ionicToastService.presentToast("Last Name Must Not Be Empty","danger","2000");
    }
    if(this.updateAccount.value.address1=="" || this.updateAccount.value.address1==null ){
      this.ionicToastService.presentToast("Address1 Must Not Be Empty","danger","2000");
    }
    else if(this.updateAccount.value.pin=="" || this.updateAccount.value.pin==null || this.updateAccount.value.pin.length!=6){
      this.ionicToastService.presentToast("Enter valid PIN","danger","2000");
    }
    else if(this.updateAccount.value.password!=this.updateAccount.value.confirm_password){
      this.ionicToastService.presentToast("Password & Confirm Password Must Be Matched","danger","2000");
    }
    else{
    //this.ionicToastService.presentToast("Please Provide All Required Fields!","danger","2000");
    //this.ionicToastService.presentToast("Password & Confirm Password Must Be Matched","danger","2000");
    }
  }
}

}


