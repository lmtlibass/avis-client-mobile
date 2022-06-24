import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sousite } from '../model/sousite';
import { Note } from '../model/note';
import { Site } from '../model/site';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private storage: StorageService ) { }

  getSouSite(): Observable<Sousite[]> {
    return this.http.get<Sousite[]>(`${environment.api_url}/soussites`);
  }
  getSite(): Observable<Site[]> {
    return this.http.get<Site[]>(`${environment.api_url}/sites`);
  }
  findSousSiteById(id: number): Observable<Sousite> {
    return this.http.get<Sousite>(`${environment.api_url}/soussites/${id}`);
  }

  addNote(avis: any): Observable<Note[]> {
    return this.http.post<Note[]>(`${environment.api_url}/addavis`, avis, this.httpOptions);
  }

}
