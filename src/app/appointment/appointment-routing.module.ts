import { CartPage } from './cart/cart.page';
import { BookAnAppointmentPage } from './book-an-appointment/book-an-appointment.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnsiteAppointmentPage } from './onsite-appointment/onsite-appointment.page';
import { OnlineAppointmentPage } from './online-appointment/online-appointment.page';
import { OrderSummaryPage } from './order-summary/order-summary.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'bookAnAppointment',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'onsiteAppointment',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'onlineAppointment',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'cart',
    pathMatch: 'full'
  },
  {
    path: 'orderSummary',
    redirectTo: 'orderSummary',
    pathMatch: 'full'
  },
  {
    path: 'bookAnAppointment',
    component:BookAnAppointmentPage
  },
  {
    path: 'onsiteAppointment',
    component:OnsiteAppointmentPage
  },
  {
    path: 'onlineAppointment',
    component:OnlineAppointmentPage
  },
  {
    path: 'cart',
    component:CartPage
  },
  {
    path: 'orderSummary',
    component:OrderSummaryPage
  },
  
  
  
];
@NgModule({
  declarations: [
    BookAnAppointmentPage,
    OnlineAppointmentPage,
    OnsiteAppointmentPage,
    CartPage,
    OrderSummaryPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
