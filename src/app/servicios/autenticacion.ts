import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AlertController } from '@ionic/angular';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { Platform } from '@ionic/angular';
import { LoadingService } from '../servicios/loading.services';
import { StorageService } from './storage.service';
//import { WonderPush } from '@awesome-cordova-plugins/wonderpush/ngx';

import {
	SignInWithApple,
	SignInWithAppleResponse,
	SignInWithAppleOptions,
  } from '@capacitor-community/apple-sign-in';

import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
	signOut
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})



export class AutenticacionService {

	user : any

  constructor(
	private  auth: Auth,
	private  router:  Router,
	private alertController: AlertController,

	private platform: Platform,
  private localstorage: StorageService,
  private loading : LoadingService,
  //private wonderPush: WonderPush,
  ) { }

  doPost(url: string , data : any) {
    const options: HttpOptions = {
      url,
      headers: {
        'Content-Type': 'application/json'
      },
      data,
    };
    return from(CapacitorHttp.post(options));
  }
 




  //////////////////////AUTHENTICATION FIREBASE///////////////////

 
  async login(email: string, password: string): Promise<any> {
    alert('hola')
    ///then1
    await setPersistence(this.auth, browserLocalPersistence);
    try {
      const _userCredential = await
        ////then2
        signInWithEmailAndPassword(this.auth, email, password);
      var data = this.auth;
      await this.localstorage.setObject('usuario', data);
      var idToken = this.auth.currentUser?.getIdToken
      await this.localstorage.setData('idToken', idToken);
      ///subcribe

this.doPost('https://washtt.com/v1_api_clientes_login.php', { idToken : idToken, email : email , password : password}).subscribe({
  next: async (data_2: any) => {

    this.loading.dismissLoader();

    switch (data_2.respuesta) {
      case 'ERROR':
        const alert1 = await this.alertController.create({
          header: 'Error',
          message: '(1) Sorry, an error occurred,please login again',
          buttons: ['OK'],
        });
        await alert1.present();

        break;

      case 'TODO_OK':
        /*this.wonderPush.setUserId(data.userid)
        this.wonderPush.addTag('clientes')*/
        await this.localstorage.setData('autenticacion_tipo', 'correo_pass');
        this.router.navigate(['/tabtobooks']);
        break;
      case 'TOKEN ERROR':

        const alert2 = await this.alertController.create({
          header: 'Error',
          message: '(2) Sorry, Invalid or expired token,please login again',
          buttons: ['OK'],
        });
        await alert2.present();
        break;

        case 'NOT_CUSTOMER':

        const alert9 = await this.alertController.create({
          header: 'Error',
          message: '(2) Sorry, User not active in this app. Please open a new account',
          buttons: ['OK'],
        });
        await alert9.present();
        break;



    }
  },
  error: async (error_1) => {

    this.loading.dismissLoader();
    var errorMessage = error_1.message;

    const alert3 = await this.alertController.create({
      header: 'Error',
      message: '(3) Sorry, an error occurred,please login again, ' + errorMessage,
      buttons: ['OK'],
    });
    await alert3.present();


  }
});
} catch (error_2) {
this.loading.dismissLoader();
var errorMessage_1 = error_2;
const alert4 = await this.alertController.create({
  header: 'Error',
  message: '(4) There was an error!, ' + errorMessage_1,
  buttons: ['OK'],
});
await alert4.present();
}
  }	





  async register( email: string , password: string, name: string) {
    this.loading.simpleLoader()
    await createUserWithEmailAndPassword(this.auth, email, password).then(
      async (_userCredential) => {
  
        var data = this.auth
        await this.localstorage.setObject('usuario',data)
       
        this.doPost('https://washtt.com/v1_api_clientes_registro.php', {name: name , email: email , password: password  }).subscribe({
          next: async (data : any) => {
            this.loading.dismissLoader()   
             switch(data.respuesta) 
             {
               case 'ERROR':
  
               const alert5 = await this.alertController.create({
                header: 'Error',
                message: '(5) Sorry, an error occurred,Please try again error 1: ' + data.mensaje,
                buttons: ['OK'],
              });
              await alert5.present(); 
  
              
               break;
               case 'DUPLICADO_USUARIO':
  
               const alert6 = await this.alertController.create({
                header: 'Error',
                message: '(6) There is already an account with this email: ',
                buttons: ['OK'],
              });
              await alert6.present(); 
  
                 
               break;
               case 'OK':
                /*this.wonderPush.setUserId(data.userid)
                this.wonderPush.addTag('clientes')*/
                await this.localstorage.setData('autenticacion_tipo','correo_pass')
                this.router.navigate(['/tabtobooks/home']);
               break;  
        
             }
        
          },
          error: async error => {
            this.loading.dismissLoader()   
              var errorMessage = error.message;
  
              const alert7 = await this.alertController.create({
                header: 'Error',
                message: '(7) There was an error!'+ errorMessage,
                buttons: ['OK'],
              });
              await alert7.present(); 
                      
          }
        });   
        
      }
  
    ).catch(async (error) => {
  
      this.loading.dismissLoader()   
      var errorMessage = error.message;
      const alert8 = await this.alertController.create({
        header: 'Error',
        message: 'There was an error!, ' + errorMessage,
        buttons: ['OK'],
      });
      await alert8.present(); 
    });
  
    }
  
	


  
  

  logout() {
    return signOut(this.auth);
  }




/////////////AUTHENTICATION APPLE/////////////////////

 /*SignInWithApple.authorize(options)
     .then((result: SignInWithAppleResponse) => {
       // Handle user information
       // Validate token with server and create new session
     })
     .catch(error => {
       // Handle error
     }); */


     openAppleSignIn() {

      let options: SignInWithAppleOptions = {
        clientId: 'com.appiosid.ttwashexpress',
        redirectURI: '',
        scopes: 'email name',
        state: '12345',
        nonce: 'nonce',
      };
  
  
       SignInWithApple.authorize(options)
       .then(async (res) => {
         if (res.response && res.response.identityToken) {
           this.user = res.response;
           this.presentAlert(res.response.identityToken);
         } else {
           //this.presentAlert(0);
           this.router.navigate(['/tabs']);
         }
       })
       .catch((response) => {
        // this.presentAlert(0);
         this.router.navigate(['/tabs']);
       });
  
  
  
  } 
  
  
     async presentAlert(x : any) {
      if(x == 0 ) {
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Please try again later',
        buttons: ['OK'],
      });
      await alert.present();
      
    }
    else {
      const alert = await this.alertController.create({
        header: 'Wellcome',
        message: x,
        buttons: ['OK'],
      });
      await alert.present();
    }
  
    }




}
