import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicToastService {
  private myToast: any;

  constructor(
    //public toast: ToastController
    private toast: ToastController
  ) { }

  // showToast() {
  //   this.myToast = this.toast.create({
  //     message: 'Ionic Auto Hide Toast on Bottom',
  //     duration: 2000
  //   }).then((toastData) => {
  //     console.log(toastData);
  //     toastData.present();
  //   });
  // }
  // HideToast() {
  //   this.myToast = this.toast.dismiss();
  // }
  async presentToast( message, color, duration: any = 2000) {
    // let toast = await this.toast.presentToast(data.title, data.body, "primary", 6000);
    //               toast.present();
    const toast =await this.toast.create({
     // header,
      message,
      duration,
      position: 'bottom',
      color 
    });
    toast.present();
  }
}
