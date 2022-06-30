import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  forEach(arg0: (element: any) => void) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _storage: Storage | null = null;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private storage: Storage){
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    // eslint-disable-next-line no-underscore-dangle
    this._storage?.set(key, value);
  }

  public get(key: string){
    // eslint-disable-next-line no-underscore-dangle
    return this._storage?.get(key);
  }
}
