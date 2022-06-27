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
  sousiteBySite: any;
  currentValue = undefined;
  arraye= [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private apiService: ApiService,
    private dataservice: DataService,) { }

  async ngOnInit() {
      this.getSouSite();
      this.sousiteBySite =  await this.storageService.get('sousite');
      console.log(this.sousiteBySite);
      // eslint-disable-next-line no-underscore-dangle
  }

  // async getuserId(){
  //    this.user = await this.storageService.get('user.site_id');
  //    console.log(this.user);
  // }

  async getData() {
    this.secretData = null;

    this.apiService.getSecretData().subscribe((res: any) => {
      this.secretData = res.msg;
    });
  }

  getSouSite(){
    return this.dataservice.getSouSite().pipe(
      map( res => res )
    )
    .subscribe( async (res: any[]) => {
        for (const sousites of res){
          if(await this.storageService.get('user.site_id') === sousites.site_id){
            this.arraye.push(sousites);
            // console.log(this.arraye);
            this.storageService.set('sousite', this.arraye);
          }else{
            this.router.navigateByUrl('/note', { replaceUrl: true });
          }
        }

    });
  }

  handleChange(ev) {
    this.currentValue = ev.target.value;
    console.log(this.currentValue.id);
    this.storageService.set('sousite_id', this.currentValue.id);
  }



}
