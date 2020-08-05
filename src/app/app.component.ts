import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { IonicToastService } from '../../src/app/services/ionic-toast.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Sign In',
      url: '/signin',
      icon: 'log-in'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Edit Profile',
      url: '/edit-profile',
      icon: 'logo-angular'
    }
  ];
  app_user_role:any;
  user_flag:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    private router: Router,
    private ionicToastService: IonicToastService,
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ionViewWillEnter(){
   this.app_user_role=localStorage.getItem("role");
   if( this.app_user_role==0){
    this.user_flag=true;
   }
   else{
    this.user_flag=false;
   }
  }
  gotoAccountPage() {
    this.menuCtrl.close();
    this.menuCtrl.enable(true);
    //localStorage.getItem("token")
    //localStorage.setItem("token",localStorage.getItem("token"));
    this.router.navigate(['profile/account']);
  }
  gotoBookAnAppointmentPage(){
    this.menuCtrl.close();
    this.menuCtrl.enable(true);
    //localStorage.getItem("token")
    //localStorage.setItem("token",localStorage.getItem("token"));
    this.router.navigate(['appointment/bookAnAppointment']);
  }
  signOut() {
    this.menuCtrl.close();
    this.menuCtrl.enable(false);
    localStorage.setItem("id", "");
    localStorage.setItem("name", "");
    localStorage.setItem("email", "");
    localStorage.setItem("phone", "");
    localStorage.setItem("role", "");
    localStorage.setItem("isLoggedin", "");
    this.ionicToastService.presentToast("Logout Successful!","success","2000");
    this.router.navigate(['user']);
  }
}
