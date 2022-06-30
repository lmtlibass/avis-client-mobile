import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {
  secretData = null;
  sousite: any;
  sousiteBySite: any [];
  currentValue = undefined;
  user: any;
  loadingCtrl: any;

  constructor(
    private storageService: StorageService,
    ){}

  async ngOnInit() {
      this.sousite = await this.storageService.get('currentsite');
      this.sousiteBySite = this.sousite;
      console.log(this.sousiteBySite);
  }

  handleChange(ev) {
    this.currentValue = ev.target.value;
    console.log(this.currentValue.id);
    this.storageService.set('sousite_id', this.currentValue.id);
  }

}
