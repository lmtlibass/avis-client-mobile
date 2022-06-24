import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {
  secretData = null;
  sousite: any;
  site: any;
  siteActive: any;
  currentValue = undefined;

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private dataservice: DataService,) { }

  ngOnInit() {
    this.getSouSite();
    this.getSite();
  }

  async getData() {
    this.secretData = null;

    this.apiService.getSecretData().subscribe((res: any) => {
      this.secretData = res.msg;
    });
  }

  getSouSite(){
      return this.dataservice.getSouSite().subscribe((res: any) => {
        this.sousite = res;
        console.log(this.sousite);
      });
    }

  handleChange(ev) {
    this.currentValue = ev.target.value;
    console.log(this.currentValue.id);
    this.storageService.set('sousite_id', this.currentValue.id);
  }

  getSite(){
    const result =  this.dataservice.getSite().subscribe((res: any) =>{
      this.site = res;
        console.log('on es bon');
      });
      console.log(result);
      return result;
  }

    // getSiteById(){
    //    // eslint-disable-next-line @typescript-eslint/naming-convention
    //   const user_id = this.apiService.currentAccesToken.user.id;
    //   console.log(user_id);
    //   this.getSite.forEach(element => {
    //     data
    //   });
    //   if( result.data.user === user_id){
    //     }
    // }



}
