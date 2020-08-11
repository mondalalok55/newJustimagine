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
  }
ionViewDidEnter (){ 
      //this.fetchProfile();
      //console.log(this.user_details);
      //this.updateAccount.patchValue({country_id:this.user_details['country_id'], state_id:this.user_details['state_id'], city_id:this.user_details['city_id']})
} 
gotoOnlineAppointmentPage(){
  this.router.navigate(['appointment/onlineAppointment']);
}
gotoOnsiteAppointmentPage(){
  this.router.navigate(['appointment/onsiteAppointment']);
}

}
