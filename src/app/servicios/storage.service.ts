import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.create();
  }

  // Create and expose methods that users of this service can
  // call, for example:

  public async setData(key: string, value: any) {
  await this.storage.set(key, value);
  }

  public async setObject(key: string, object: Object) {
    await this.storage.set(key, JSON.stringify(object));
  }

 /* public getObject(key: string) {
   return this.storage.get(key);

    
  }*/

  public async getData(key: string) {
    return await  this.storage.get(key);
  }

  public async removeData(key: string) {
    await this.storage.remove(key);
  }

  public clearData() {
    this.storage.clear().then(
      ()=>console.log('Limpiado todo localstore')
    )
  }





}