import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { WonderPush } from '@awesome-cordova-plugins/wonderpush/ngx';



@Component({
  
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {
  constructor(
    private platform: Platform,
    // private wonderPush: WonderPush,


  ) {

  /*this.platform.ready().then(() => {

      
    this.wonderPush.subscribeToNotifications()
    this.wonderPush.addTag('clientes')

    
      
    });*/




  }




}
