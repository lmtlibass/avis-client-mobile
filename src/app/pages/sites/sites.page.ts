import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
// import { pipe } from 'rxjs';
// import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
// import { filter } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';

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
