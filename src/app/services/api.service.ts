
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class ApiService {
 token=localStorage.getItem("token");

    //--------------------------------------------------------
  //------ header setup with token
  //--------------------------------------------------------
  httpOptionsForToken: any = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
      'Accept': this.token
    })
  }
  //--------------------------------------------------------
  //------ header setup without token
  //--------------------------------------------------------
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
    })
  }
  //--------------------------------------------------------
  //------ all api lists
  //--------------------------------------------------------
  allApiEndPoints: Array<string> = [
    `${environment.apiUrl}/user/login/`,                        // 0
    `${environment.apiUrl}/user/registration/`,                        // 1
    `${environment.apiUrl}/user/otpverificationLogin/`,                        // 2
    `${environment.apiUrl}/user/forgetPassword/` ,                      // 3
    `${environment.apiUrl}/user/fetchProfile/` ,                      // 4
    // `${environment.apiUrl}/user/getState/`+this.user_id+`/`+this.get_id ,                      // 5
    `${environment.apiUrl}/user/getState/`,                      // 5
    // `${environment.apiUrl}/user/getCity/`+this.user_id+`/`+this.get_id ,                      // 6
    `${environment.apiUrl}/user/getCity/`,                      // 6
    `${environment.apiUrl}/user/updateAccount/`,  //7
    `${environment.apiUrl}/appointment/getOnsiteAppointmentSlotList/`,  //8
    `${environment.apiUrl}/appointment/saveAppointmentToCart/`,  //9
    `${environment.apiUrl}/appointment/getCityList/`,  //10
    `${environment.apiUrl}/appointment/getOnlineAppointmentSlotList/`, //11
    `${environment.apiUrl}/appointment/getAppointmentSlotList/` ,//12
    `${environment.apiUrl}/appointment/getCartAppointmentSlotList/` , //13
    `${environment.apiUrl}/appointment/deleteCartItem/` , //14
  ];
constructor(private http: HttpClient) {}
// post(serviceName: string, data: any) {
// const headers = new HttpHeaders();
// const options = { headers: headers, withCredintials: false };
// const url = environment.apiUrl + serviceName;

// return this.http.post(url, JSON.stringify(data), options);
// }
  //--------------------------------------------------------
  //------ HTTP call with token setup 
  //--------------------------------------------------------
  sendHttpCallWithToken(url: any, data: any = '', method: any = 'get') {
    if (navigator.onLine === false) {
      console.log('No internet Connection');
      // this.showToast('Opps, unable to connect internet');
    } else {
      console.log(this.httpOptionsForToken);
      if(this.httpOptionsForToken.headers.get("Accept")){
      //console.log("sendHttpCallWithToken:");  
      console.log(this.httpOptionsForToken.headers.get("Accept"));
      switch (method) {
        case 'post':
          console.log(data);
          return this.http.post<any>(url, data, this.httpOptionsForToken);

        case 'get':
          console.log(data);
          return this.http.get<any>(url, this.httpOptionsForToken);

        case 'put':
          console.log(data);
          return this.http.put<any>(url, data, this.httpOptionsForToken);

        case 'delete':
          console.log(data);
          return this.http.delete<any>(url, this.httpOptionsForToken);

        default:
          console.log('Add method');
      }
    }
  }
  }





  //--------------------------------------------------------
  //------ HTTP call without token setup 
  //--------------------------------------------------------
  sendHttpCall(url: any, data: any = '', method: any = 'get') {
    if (navigator.onLine === false) {
      console.log('No internet Connection');      
      // this.showToast('Opps, unable to connect internet');
    } else {

      switch (method) {
        case 'post':
          console.log(data);
          return this.http.post<any>(url, data, this.httpOptions);
  
        case 'get':
          console.log(data);
          return this.http.get<any>(url, this.httpOptions);
  
        case 'put':
          console.log(data);
          return this.http.put<any>(url, data, this.httpOptions);
  
        case 'delete':
          console.log(data);
          return this.http.delete<any>(url, this.httpOptions);
  
        default:
          confirm('Add Method');
      }

    }
    
  }










}



