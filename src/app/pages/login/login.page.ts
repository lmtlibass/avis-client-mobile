import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userform: FormGroup;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.userform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    // console.log(this.userform.value);

    this.apiService.login(this.userform.value).subscribe(
      async _ => {
        // console.log('message');
        await loading.dismiss();
        this.router.navigateByUrl('/sites', { replaceUrl: true });
  },
      async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'login failed',
          message: err.error.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
}

}
