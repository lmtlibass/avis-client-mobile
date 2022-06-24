import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  constructor(private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
     this.goToHome();
  }

    async goToHome(){
      const loading = await this.loadingCtrl.create({duration: 9000});
      await loading.dismiss();
      this.router.navigateByUrl('/note', { replaceUrl: true });
    }
}
