import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/operators';
import { Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  networkStatus: any;
  networkListener: PluginListenerHandle;
  userform: FormGroup;
  soussite: any;
  currentSite: any [];


  constructor(
    private dataservice: DataService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.userform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.networkListener = await Network.addListener('networkStatusChange', status => {
      console.log('networkStatusChange', status);
      this.networkStatus = status;
    });

  }

  async login() {
    this.networkStatus = await Network.getStatus();
    console.log(this.networkStatus);
    if(this.networkStatus.connected === false){
      this.presentAlert();
    }else{
        const loading = await this.loadingCtrl.create();
        await loading.present();
        this.apiService.login(this.userform.value).subscribe(
          async _ => {
              await loading.dismiss();
              console.log(this.apiService.currentAccesToken);
              this.storageService.set('user.site_id', this.apiService.currentAccesToken.user.site_id);
              this.getSite();
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

  getSite(){
    return this.dataservice.getSite().pipe(
      map( res => res)
    )
    .subscribe( async (res: any[])=>{
        this.soussite = res;
        console.log(this.soussite);
        for(const site of this.soussite ){
          if(await this.storageService.get('user.site_id') === site.id ){
              console.log(site.id);
              this.currentSite = site.sous_sites;
              this.storageService.set('currentsite', this.currentSite);
                if(this.currentSite.length === 0){
                  this.router.navigateByUrl('/note', { replaceUrl: true });
                }else {
                  this.router.navigateByUrl('/sites', { replaceUrl: true });
                }
          }
        }
    });
  }

  //allerte if connetion is lost
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Oups!',
      message: 'Vous n\'êtes pas connecté à internet',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnDestroy() {
    this.networkListener.remove();
  }


}
