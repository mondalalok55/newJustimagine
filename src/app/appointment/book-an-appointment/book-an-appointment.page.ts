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
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-book-an-appointment',
  templateUrl: './book-an-appointment.page.html',
  styleUrls: ['./book-an-appointment.page.scss'],
})
export class BookAnAppointmentPage implements OnInit {
  appointmentSlotList: FormGroup;
  slot_list: any;
  slot_list_data:any;
  constructor(
    public router: Router,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private ionicToastService: IonicToastService,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) { }
  ngOnInit() {
    this.appointmentSlotList = this.formBuilder.group({
      city_id: ['']
    })
  }
  ionViewWillEnter(){
    this.menuCtrl.enable(true);
    //let check_token=localStorage.getItem("token");
    //localStorage.setItem("token",check_token);
    //this.token=1;
    //if(this.token){
  this.getAppointmentSlotList();
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
    let url = this.apiService.allApiEndPoints[8]+user_id+`/`+city_id;
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
        }
      });
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
  bookAppointmentAction(){

  }
}
