import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    private authSrvc: AuthService,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  onSignin(form: NgForm) {
    const loading = this.loadCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authSrvc.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
