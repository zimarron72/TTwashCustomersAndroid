import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { App } from '@capacitor/app';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { WonderPush } from '@awesome-cordova-plugins/wonderpush/ngx';



@Component({
  
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {

versionActual:any


  constructor(
    private platform: Platform,
    private aviso: AlertController,
    private wonderPush : WonderPush
   

  ) {

   this.inicializarApp()

  }

 public async openAlert2(mensaje: string,  url: string) {
    const alert = await this.aviso.create({
      header:'Warning, outdated app',
      animated: true,
      backdropDismiss: false,
      //message: new IonicSafeString(`<img src="./assets/icon/icon-48.webp" alt="logop" /><br>${mensaje}`),
      message: mensaje,
      buttons: [
      {
        text: 'UPDATE NOW',
        handler: () => {
        window.open(url,'_system')
        },
        role: '',
      }

      ]
    });
    await alert.present();
  } 

cHttps(url: string, data: any) {
    const options: HttpOptions = {
      url,
      headers: {
        // 'Authorization': 'Token asdf',
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      data
    }
    return from(CapacitorHttp.post(options))
  }

 inicializarApp() {
this.platform.ready().then(async ()=>{
  setTimeout(() => {
  this.wonderPush.subscribeToNotifications().then(

  )
    
}, 3000)
 await this.sleep(8500)
this.checkVersion()
 
});



  } 


 sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
} 
 
checkVersion() {

  App.getInfo().then(info=> {
    this.versionActual = info.version
    if(this.platform.is('ios')){

var url = 'https://app.washtt.com/1A_check_version.php'
      var data = {
        plataforma: 'IOS',
        app : 'CUSTOMERS'
      }
      this.cHttps(url, data).subscribe(
        async (res: any) => {
                 console.log(res.data)

                 var resultado =   this.compare(this.versionActual,res.data.version)

                 if(resultado != 0 ){
                   var mensaje = 'You have the old version of the app, '+this.versionActual+' update the app to the latest version '+res.data.version+' to ensure proper functioning.'
                 this.openAlert2(mensaje,res.data.url)    
                 }  
                 })
  }

})

if(this.platform.is('android')){

  var url = 'https://app.washtt.com/1A_check_version.php'
      var data = {
        plataforma: 'ANDROID',
        app : 'CUSTOMERS'
      }
      this.cHttps(url, data).subscribe(
        async (res: any) => {
                 console.log(res.data)

var resultado =   this.compare(this.versionActual,res.data.version)

        if(resultado != 0 ){
          var mensaje = 'You have the old version of the app, '+this.versionActual+' update the app to the latest version '+res.data.version+' to ensure proper functioning.'
        this.openAlert2(mensaje,res.data.url)    
        }
            
        }) 

}


                 }          
 /* var url = 'https://app.washtt.com/1A_check_version.php'
      var data = {
        plataforma: 'IOS',
        app : 'CUSTOMERS'
      }
      this.cHttps(url, data).subscribe(
        async (res: any) => {
                 console.log(res.data)

                 var resultado =   this.compare(this.versionActual,res.data.version)

                 if(resultado != 0 ){
                   var mensaje = 'You have the old version of the app, '+this.versionActual+' update the app to the latest version '+res.data.version+' to ensure proper functioning.'
                 this.openAlert2(mensaje,res.data.url)    
                 }          
                 
        }) */








// Return 1 if a > b
// Return -1 if a < b
// Return 0 if a == b
compare(a: string, b:string) {
  if (a === b) {
     return 0;
  }

  var a_components = a.split(".");
  var b_components = b.split(".");

  var len = Math.min(a_components.length, b_components.length);

  // loop while the components are equal
  for (var i = 0; i < len; i++) {
      // A bigger than B
      if (parseInt(a_components[i]) > parseInt(b_components[i])) {
          return 1;
      }

      // B bigger than A
      if (parseInt(a_components[i]) < parseInt(b_components[i])) {
          return -1;
      }
  }

  // If one's a prefix of the other, the longer one is greater.
  if (a_components.length > b_components.length) {
      return 1;
  }

  if (a_components.length < b_components.length) {
      return -1;
  }

  // Otherwise they are the same.
  return 0;
}
 

}
function sleep(arg0: number) {
  throw new Error('Function not implemented.');
}

