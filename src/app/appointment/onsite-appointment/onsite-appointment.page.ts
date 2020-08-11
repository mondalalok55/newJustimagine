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
  selector: 'app-onsite-appointment',
  templateUrl: './onsite-appointment.page.html',
  styleUrls: ['./onsite-appointment.page.scss'],
})
export class OnsiteAppointmentPage implements OnInit {
  appointmentSlotList: FormGroup;
  fetchAppointmentSlotList: FormGroup;
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
    this.fetchAppointmentSlotList = this.formBuilder.group({
      city_id: ['', Validators.required],
      appointment_date:['', Validators.required],
      userid:['', Validators.required]
    })
    this.appointmentSlotList = this.formBuilder.group({
      slot_id_arr: [''],
    })
  }
  ionViewWillEnter(){
  this.menuCtrl.enable(true);
  this.getAppointmentSlotList();
  this.getCityList();
  this.userid=localStorage.getItem("id");
  }
ionViewDidEnter (){ 
      //this.fetchProfile();
      //console.log(this.user_details);
      //this.fetchAppointmentSlotList.patchValue({country_id:this.user_details['country_id'], state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})
}
getCityList(){
    let user_id=localStorage.getItem("id");
    let user_role=localStorage.getItem("role");
    //let city_id=0;
    localStorage.setItem("token",localStorage.getItem("token"));
    let check_token=localStorage.getItem("token");
    this.apiService.httpOptionsForToken= {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Accept': check_token
      })
    }
    if(check_token){
    let url = this.apiService.allApiEndPoints[10]+user_id+"/"+user_role;
    let i;
    this.apiService.sendHttpCallWithToken(url,"","get").subscribe(
      (res: any) => {
       //console.log(res);
      if (res.status==true){
      // Storing the User data.
      this.city_list=res.data.city;
      console.log("Fetch City List");
      console.log(this.city_list);
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
getAppointmentSlotList() {
    let user_id=localStorage.getItem("id");
    let user_role=localStorage.getItem("role");
    let city_id=0;
    localStorage.setItem("token",localStorage.getItem("token"));
    let check_token=localStorage.getItem("token");
    this.apiService.httpOptionsForToken= {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
        'Accept': check_token
      })
    }
    if(check_token){
    let url = this.apiService.allApiEndPoints[12]+user_id;
    let i;
    this.apiService.sendHttpCallWithToken(url,"","get").subscribe(
      (res: any) => {
       //console.log(res);
      if (res.status==true){
      // Storing the User data.
      this.slot_list=res.data;
      this.slot_list.forEach(item => {
        if(item.onsite_time_slot){
          item.onsite_time_slot = JSON.parse(item.onsite_time_slot);
          item.onsite_time_slot.forEach(i=>{
            i.selected=false
            //console.log(i);
          })
          //console.log(item.onsite_time_slot[0].start_time);
        }
        if(item.onsite_time_slot_id_arr){
          item.onsite_time_slot_id_arr = JSON.parse(item.onsite_time_slot_id_arr);
          item.onsite_time_slot_id_arr.forEach(i=>{
            //console.log(i);
          })
        }
        if(item.time_slot){
          item.time_slot = JSON.parse(item.time_slot);
          //console.log(item.time_slot[0].start_time);
        }
        if(item.time_slot_id_arr){
          item.time_slot_id_arr = JSON.parse(item.time_slot_id_arr);
        }
      });
      //console.log(this.slot_list);
      // //this.slot_list_data=res.data;
      // for(i=0;i<this.slot_list.count;i++){
      //   this.slot_list_data[0].this.slot_list[0];
      //   this.slot_list_data[0]['onsite_slot']=json.parse(this.slot_list[0].onsite_time_slot);
      // }
      console.log("Fetch Slot List");
      console.log(this.slot_list);
     
     
     
      } else {
      this.ionicToastService.presentToast(res.message,"danger","2000");
      // localStorage.setItem("id", "");
      // localStorage.setItem("name", "");
      // localStorage.setItem("email", "");
      // localStorage.setItem("phone", "");
      // localStorage.setItem("role", "");
      // localStorage.setItem("isLoggedin", "");
      // this.router.navigate(['user']);
      }
      },
      (error: any) => {
      //console.log(res);
      this.ionicToastService.presentToast("Network Issue","danger","2000");
      }
      );
    }
} 
getAppointmentSlotListAction(){
 // console.log(this.fetchAppointmentSlotList.value);
  localStorage.setItem("token",localStorage.getItem("token"));
  let check_token=localStorage.getItem("token");
  this.apiService.httpOptionsForToken= {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
      'Accept': check_token
    })
   }
    let url = this.apiService.allApiEndPoints[8];
    //console.log(this.appointment_data);
    let flag=this.fetchAppointmentSlotList.invalid;
    if(!flag){
    this.apiService.sendHttpCallWithToken(url,this.fetchAppointmentSlotList.value,"post").subscribe(
      (res: any) => {
      console.log(res);
      if (res.status==true) {
     // Storing the User data.
     this.slot_list=res.data;
     this.slot_list.forEach(item => {
       if(item.onsite_time_slot){
         item.onsite_time_slot = JSON.parse(item.onsite_time_slot);
         item.onsite_time_slot.forEach(i=>{
           i.selected=false
           //console.log(i);
         })
         //console.log(item.onsite_time_slot[0].start_time);
       }
       if(item.onsite_time_slot_id_arr){
         item.onsite_time_slot_id_arr = JSON.parse(item.onsite_time_slot_id_arr);
         item.onsite_time_slot_id_arr.forEach(i=>{
           //console.log(i);
         })
       }
       if(item.time_slot){
         item.time_slot = JSON.parse(item.time_slot);
         //console.log(item.time_slot[0].start_time);
       }
       if(item.time_slot_id_arr){
         item.time_slot_id_arr = JSON.parse(item.time_slot_id_arr);
       }
     });
     //console.log(this.slot_list);
     // //this.slot_list_data=res.data;
     // for(i=0;i<this.slot_list.count;i++){
     //   this.slot_list_data[0].this.slot_list[0];
     //   this.slot_list_data[0]['onsite_slot']=json.parse(this.slot_list[0].onsite_time_slot);
     // }
     console.log("Fetch Slot List");
     console.log(this.slot_list);
      } else {
        if (res.error_code==3) {
          this.slot_list=[];
          this.ionicToastService.presentToast(res.message,"danger","2000");
        }else{
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
      console.log('Network Issue.');
      }
      );
    }
    else{
      if(this.fetchAppointmentSlotList.value.city_id=="" || this.fetchAppointmentSlotList.value.city_id==null ){
        this.ionicToastService.presentToast("Select A City","danger","2000");
      }
      else if(this.fetchAppointmentSlotList.value.appointment_date=="" || this.fetchAppointmentSlotList.value.appointment_date==null ){
        this.ionicToastService.presentToast("Select A Date","danger","2000");
      }
      else{
      //this.ionicToastService.presentToast("Please Provide All Required Fields!","danger","2000");
      //this.ionicToastService.presentToast("Password & Confirm Password Must Be Matched","danger","2000");
      }
    }
    
}
getTimeSlot(event,assigned_slot_id){
  //console.log(event);
    let slot_id=event.target.value;
    this.slot_list.forEach(item => {
    if(item.id==assigned_slot_id){
      //item.onsite_time_slot = JSON.parse(item.onsite_time_slot);
      item.onsite_time_slot.forEach(i=>{
        if(i.slot_id==slot_id){
          if(i.selected==false){
           i.selected=true;
           this.slot_id_data_arr.push(assigned_slot_id);
          }
          else{
            i.selected=false;
            let index = this.slot_id_data_arr.indexOf(assigned_slot_id);
            this.slot_id_data_arr.splice(index, 1);
          }
        //console.log(i);
        }
      })
      //console.log(item.onsite_time_slot[0].start_time);
    }
    // if(item.onsite_time_slot_id_arr){
    //   item.onsite_time_slot_id_arr = JSON.parse(item.onsite_time_slot_id_arr);
    //   item.onsite_time_slot_id_arr.forEach(i=>{
    //     //console.log(i);
    //   })
    // }
  });

}
bookAppointmentAction(){
  console.log(this.slot_list);
  console.log(this.slot_id_data_arr);
  let user_id=localStorage.getItem("id");
  let user_role=localStorage.getItem("role");
  let city_id=0;
  let check_slot_arr=this.slot_id_data_arr.length;
  localStorage.setItem("token",localStorage.getItem("token"));
  let check_token=localStorage.getItem("token");
  this.apiService.httpOptionsForToken= {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
      'Accept': check_token
    })
  }
    let url = this.apiService.allApiEndPoints[9];
    this.appointment_data.slot_list=this.slot_list;
    this.appointment_data.slot_id_data_arr=this.slot_id_data_arr;
    this.appointment_data.user_id=user_id;
    this.appointment_data.booking_type="onsite";
    console.log(this.appointment_data);
    if(check_slot_arr>0){
    this.apiService.sendHttpCallWithToken(url,this.appointment_data,"post").subscribe(
      (res: any) => {
      console.log(res);
      if (res.status==true) {
      // Storing the User data.
      //let data=res.data;
      //localStorage.setItem("id", res.inserted_id);
      //console.log(data);
      //this.showMyToast();
      this.ionicToastService.presentToast(res.message,"success","2000");
      this.router.navigate(['appointment/cart']);
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
      this.ionicToastService.presentToast("Please Choose An Appointment","danger","2000");
    }
    
}
gotoCartPage(){
  this.router.navigate(['appointment/cart']);
}
}
