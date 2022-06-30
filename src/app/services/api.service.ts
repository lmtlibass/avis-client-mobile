import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentAccesToken = null;
  url = environment.api_url;


  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {
  }



  //recuperer les données secrétes
  getSecretData() {
    return this.http.get(`${this.url}/register/secret`);
  }

  //inscription/register
  register(credentials: {email: any; password: any}): Observable<any> {
    return this.http.post(`${this.url}/register`, credentials);
  }

  //connexion/login
  login(credentials: {email: any; password: any}): Observable<any> {
    return this.http.post(`${this.url}/login`, credentials).pipe(
      switchMap((tokens) => {
        this.currentAccesToken = tokens;
        return from(Promise.all([tokens]));
      }),
      tap(() => {
        this.isAuthenticated.next(true);
      })
    );
  }

  // storeId(){
  //   console.log(this.currentAccesToken.user);
  //   this.storageService.set('user', this.currentAccesToken.user);
  // }


}
