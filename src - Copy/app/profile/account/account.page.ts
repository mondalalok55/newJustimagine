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
  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private ionicToastService: IonicToastService,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) {

   }


 validateName(event){
  console.log('validateName(  running >>>> ', event.target.value);
  let rawval = event.target.value;
  let newdata = rawval.replace(/[^a-zA-Z ]+/g, '');
  event.target.value = newdata;

  this.updateAccount.patchValue({
    name: newdata
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

 fetchProfile() {
    let url = this.apiService.allApiEndPoints[4];
    this.apiService.sendHttpCallWithToken(url,"","get").subscribe(
      (res: any) => {
       //console.log(res);
      if (res.status==true) {
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
        this.updateAccount.patchValue({
          city_id: this.user_details.city_id
        });
      }

      } else {
      console.log('incorrect password.');
      }
      },
      (error: any) => {
      //console.log(res);
      console.log('Network Issue.');
      }
      );
} 
getState(event) {
  let get_id=event.target.value;
  console.log("state");
  console.log(get_id);
  localStorage.setItem("get_id",get_id);
  let user_id=localStorage.getItem("id");
  var url = this.apiService.allApiEndPoints[5]+user_id+`/`+get_id;
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
    console.log("State");
    console.log(res.data.state);
    
    } else {
    console.log('incorrect password.');
    }
    },
    (error: any) => {
    console.log('Network Issue.');
    }
    );
} 
getCity(event) {
  let get_id=event.target.value;
  console.log("City");
  console.log(get_id);
  localStorage.setItem("get_id",get_id);
  //var url = this.apiService.allApiEndPoints[6];
  let user_id=localStorage.getItem("id");
  var url = this.apiService.allApiEndPoints[6]+user_id+`/`+get_id;
  this.apiService.sendHttpCallWithToken(url,"","get").subscribe(
    (res: any) => {
    // console.log(res);
    if (res.status==true) {
    // Storing the User data.
    this.city=res.data.city;
    console.log("City");
    console.log(res.data.city);
    this.updateAccount.patchValue({
      city_id:""
    });
    } else {
    console.log('incorrect password.');
    }
    },
    (error: any) => {
    console.log('Network Issue.');
    }
    );
} 
updateAccountAction() {
  console.log('====================================');
  console.log(this.updateAccount.invalid);
  console.log('====================================');
  //console.log('form registrationAction()');
  console.log( this.updateAccount.value);
  this.account_details=this.updateAccount.value;
  let name = this.account_details.name;
  let address1 = this.account_details.address1;
  let country_id = this.account_details.country_id;
  let state_id = this.account_details.state_id;
  let city_id = this.account_details.city_id;
  let pin = this.account_details.pin;
  if(name=="" || name==null){
    alert("Enter The Valid Name");
  }
  else if(address1=="" || address1==null){
    alert("Enter The Valid Name");
  }
  else if(country_id=="" || country_id==null){
    alert("Enter The Valid Name");
  }
  else if(state_id=="" || state_id==null){
    alert("Enter The Valid Name");
  }
  else if(city_id=="" || city_id==null){
    alert("Enter The Valid Name");
  }
  else if(pin=="" || pin==null){
    alert("Enter The Valid Name");
  }
  
  else{
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
    console.log('incorrect password.');
    }
    },
    (error: any) => {
    console.log('Network Issue.');
    }
    );
  }
}
  ngOnInit() {
    this.updateAccount = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/)
      ]],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      country_id: ['1', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      pin: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ]],
      user_id: ['', Validators.required]
    })
  }
  ionViewWillEnter(){
  this.menuCtrl.enable(true);
   this.fetchProfile();
   //console.log(this.user_details);
   //this.updateAccount.patchValue({country_id:this.user_details['country_id'], state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})

   //this.updateAccount.patchValue({country_id:this.user_details['country_id'], state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})
  }
  ionViewDidEnter () { 
    //this.fetchProfile();
    //console.log(this.user_details);
    //this.updateAccount.patchValue({country_id:this.user_details['country_id'], state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})

  }
}


