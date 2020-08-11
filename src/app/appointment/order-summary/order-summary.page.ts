import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { validate } from 'json-schema';
import { log } from 'util';
import { IonicToastService } from './../../services/ionic-toast.service';
//import { MenuController } from 'ionic-angular';
import { MenuController,AlertController} from '@ionic/angular';
//import { NavController, Platform, AlertController, MenuController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {
  slot_list: any;
  slot_id_data_arr:any =[];
  appointment_data:any ={};
  city_list:any;
  userid:any;
  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private ionicToastService: IonicToastService,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) { }
  ngOnInit() {
   
  }
  ionViewWillEnter(){
  this.menuCtrl.enable(true);
  this.getAppointmentSlotList();
  //this.getCityList();
  this.userid=localStorage.getItem("id");
  }
ionViewDidEnter (){ 
      //this.fetchProfile();
      //console.log(this.user_details);
      //this.fetchAppointmentSlotList.patchValue({country_id:this.user_details['country_id'], state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})
}

getAppointmentSlotList() {
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
    let url = this.apiService.allApiEndPoints[13]+user_id;
    let i;
    this.apiService.sendHttpCallWithToken(url,"","get").subscribe(
      (res: any) => {
       //console.log(res);
      if (res.status==true){
      // Storing the User data.
      this.slot_list=res.data;
      this.slot_list.forEach(item => {
        if(item.time_slot){
          item.time_slot = JSON.parse(item.time_slot);
          item.time_slot.forEach(i=>{
            i.selected=false
            //console.log(i);
          })
          //console.log(item.onsite_time_slot[0].start_time);
        }
        if(item.time_slot_id_arr){
          item.time_slot_id_arr = JSON.parse(item.time_slot_id_arr);
          item.time_slot_id_arr.forEach(i=>{
            //console.log(i);
          })
        }
        
      });
      console.log(this.slot_list);
      // //this.slot_list_data=res.data;
      // for(i=0;i<this.slot_list.count;i++){
      //   this.slot_list_data[0].this.slot_list[0];
      //   this.slot_list_data[0]['onsite_slot']=json.parse(this.slot_list[0].onsite_time_slot);
      // }
      console.log("Fetch Slot List");
      console.log(this.slot_list);
     
     
     
      } else {
      if (res.error_code==3){
        this.slot_list=[];
        this.ionicToastService.presentToast(res.message,"danger","2000");
      }
      else{
      this.slot_list=[];  
      this.ionicToastService.presentToast(res.message,"danger","2000");
      localStorage.setItem("id", "");
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
      localStorage.setItem("phone", "");
      localStorage.setItem("role", "");
      localStorage.setItem("isLoggedin", "");
      this.router.navigate(['user']);
      }
     
      }
      },
      (error: any) => {
      //console.log(res);
      this.ionicToastService.presentToast("Network Issue","danger","2000");
      }
      );
    }
} 
gotoOrderSummaryPage(){
  this.router.navigate(['appointment/orderSummary']);
}
gotoHomePage(){
  this.router.navigate(['home']);
}
deleteCartItem(cart_id){
  console.log(cart_id);
  let user_id=localStorage.getItem("id");
  localStorage.setItem("token",localStorage.getItem("token"));
  let check_token=localStorage.getItem("token");
  this.apiService.httpOptionsForToken= {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
      'Accept': check_token
    })
  }
  if(check_token){
  let url = this.apiService.allApiEndPoints[14]+user_id+`/`+cart_id;
  let i;
  this.apiService.sendHttpCallWithToken(url,"","get").subscribe(
    (res: any) => {
     //console.log(res);
    if (res.status==true){
    // Storing the User data.
    this.ionicToastService.presentToast(res.message,"success","2000");
    this.getAppointmentSlotList();
    } else {
    if (res.error_code==3){
      this.ionicToastService.presentToast(res.message,"danger","2000");
    }
    else if (res.error_code==4){
      this.ionicToastService.presentToast(res.message,"danger","2000");
    }
    else{
    this.ionicToastService.presentToast(res.message,"danger","2000");
    localStorage.setItem("id", "");
    localStorage.setItem("name", "");
    localStorage.setItem("email", "");
    localStorage.setItem("phone", "");
    localStorage.setItem("role", "");
    localStorage.setItem("isLoggedin", "");
    this.router.navigate(['user']);
    }
    }
    },
    (error: any) => {
    //console.log(res);
    this.ionicToastService.presentToast("Network Issue","danger","2000");
    }
    );
  }
}

}
