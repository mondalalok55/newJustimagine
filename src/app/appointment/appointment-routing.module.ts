import { BookAnAppointmentPage } from './book-an-appointment/book-an-appointment.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'bookAnAppointment',
    pathMatch: 'full'
  },
  {
    path: 'bookAnAppointment',
    component:BookAnAppointmentPage
  }
];
@NgModule({
  declarations: [BookAnAppointmentPage],
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
