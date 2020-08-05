import { DashboardPage } from './dashboard/dashboard.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountPage } from './account/account.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'account',
    component:AccountPage
  }
];

@NgModule({
  declarations: [AccountPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
