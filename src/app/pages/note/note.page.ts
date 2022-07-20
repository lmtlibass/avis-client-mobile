import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/note';
import { DataService } from 'src/app/services/data.service';
import { LoadingController, AlertController, NavController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  color1: string;
  color2: string;
  color3: string;
  value = 'red';
  // active= 'visible-popup';
  active = 'desible-popup';


  constructor(
              private storageService: StorageService,
              private dataservice: DataService,
              // private loadingCtrl: LoadingController,
              private router: Router,
              ) { }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  satisfaction: Note = {
    note: 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    sou_site_id: null,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    site_id: 1,
  };

  async ngOnInit() {
  }

  async noter(value){
    if(!true){
    return null;
    }else {
     switch (value) {
      case 1:
        this.satisfaction.note = 10;
        this.color1 = 'green';
        break;
      case 2:
        this.satisfaction.note =5;
        this.color2 = 'green';
        break;
      case 3:
        this.satisfaction.note = 0;
        this.color3 = 'green';
        break;
    }
  }
  // this.presentLoadingWithOptions();//appelle de spinner function
  this.satisfaction.sou_site_id = await this.storageService.get('sousite_id');
  this.satisfaction.site_id     =  await this.storageService.get('user.site_id');
  this.addnote();
  this.popupSuccess();
  // this.displayToast();
  }

  addnote(){
    return this.dataservice.addNote(this.satisfaction).subscribe((res: any) => {
      console.log(res);
    });
  }

  // //function pour rrenvoyer vers la page success
  // async sendNote(){
  //   const loading = await this.loadingCtrl.create({});
  //   await loading.dismiss();
  // }



  // async presentLoadingWithOptions() {
  //   const loading = await this.loadingCtrl.create({
  //     spinner: 'circles',
  //     duration: 1000,
  //     // message: 'Merci de donner votre avis',
  //     translucent: true,
  //     cssClass: 'custom-class custom-loading-circle gg',
  //     backdropDismiss: true
  //   });
  //   await loading.present();
  // }



  // displayToast() {
  //   // Stop multiple toasts
  //   try {
  //     this.toastContreoller.dismiss().then(() => {
  //     }).catch(() => {
  //     }).finally(() => {
  //     });
  //   } catch(e) {}
  //    this.toastContreoller.create({
  //     header: 'envoyé',
  //     message: 'merci de votre retour',
  //     position: 'middle',
  //     cssClass: 'toast-custom-class',
  //     buttons: [
  //       {
  //         side: 'end',
  //         icon: 'checkmark',
  //         handler: () => {
  //           console.log('');
  //         }
  //       },
  //     ]
  //   }).then((toast) => {
  //     toast.present();
  //   });
  // }
  popupSuccess(){
    if(true && this.addnote()){
      this.active = 'visible-popup';
    }else
    {
      console.log('oups!');
    }
  }
  popupDesible(){
    this.color1 = '';
    this.color2 = '';
    this.color3 = '';
    return this.active = 'desible-popup';
  }


}


