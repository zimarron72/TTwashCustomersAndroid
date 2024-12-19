import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { LoadingService } from '../servicios/loading.services';
import { StorageService } from './storage.service';

//import { WonderPush } from '@awesome-cordova-plugins/wonderpush/ngx';

import {
  SignInWithApple,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from '@capacitor-community/apple-sign-in';

import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})



export class AutenticacionService {

  

  

  constructor(
    private auth: Auth,
    private router: Router,
    private alertController: AlertController,
    private localstorage: StorageService,
    private loading: LoadingService,
    //private wonderPush: WonderPush,
  ) { }
  




  //////////////////////AUTHENTICATION FIREBASE///////////////////


  async login(email: string, password: string) {
    this.loading.simpleLoader()
    signInWithEmailAndPassword(this.auth, email, password).then(
      async (_res) => {
        this.loading.dismissLoader()
        let user = _res.user
        await this.localstorage.setObject('usuario',user)
        _res.user.getIdToken(false).then(
          async (_neon:string) => {
            let idtoken = _neon
            await this.localstorage.setData('idtoken',idtoken)
            var url = "https://washtt.com/v1_api_clientes_login.php"
            var data1 = { email: email, password: password, idtoken : idtoken }
            this.cHttps(url, data1).subscribe(
              async (res: any) => {
                let mensaje
                let header
                let code
                switch (res.data.respuesta) {
                  case 'ERROR':  
                  code = '01'
                  header = 'Error'              
                  mensaje = 'an error occurred,please login again'
                  this.aviso(header,mensaje,code)                  
                  break;            
                  case 'TODO_OK':
                    /*this.wonderPush.setUserId(data.userid)
                    this.wonderPush.addTag('clientes')*/
                    await this.localstorage.setData('autenticacion_tipo', 'correo_pass');
                    alert(res.data.respuesta)
                   // this.router.navigate(['/tabtobooks']);
                    break;
                  case 'TOKEN ERROR':
                  code = '01'
                  header = 'Error' 
                  mensaje = 'Invalid or expired token,please login again'
                  this.aviso(header,mensaje,code)                       
                  break;            
                  case 'NOT_CUSTOMER':
                  code = '01'
                  header = 'Error' 
                  mensaje = 'user not active in this app. Please open a new account'                     
                  this.aviso(header,mensaje,code)
                  break;
                  default:
                  code = '01'
                  header = 'Error' 
                  mensaje = 'something is wrong right now. Please try again later.' 
                  this.aviso(header,mensaje,code)      
                }
                              
              }
            )
          }        
        )
            }
    ).catch(
      async (error) => {
        let mensaje
        let header
        let code
        this.loading.dismissLoader()     
   switch(error.code) {
    case 'auth/invalid-email':
      code = '02'
      header = 'Error'
      mensaje = 'invalid email'
      this.aviso(header,mensaje,code)
    break;
    case 'auth/wrong-password':
       code = '02'
      header = 'Error'
      mensaje = 'wrong password'
      this.aviso(header,mensaje,code)
    break;
    case 'auth/user-not-found':
       code = '02'
      header = 'Error'
       mensaje = 'user not found'
       this.aviso(header,mensaje,code)
    break;
    default:
       code = '02'
      header = 'Error'
      mensaje = 'something is wrong right now. Please try again later.'
      this.aviso(header,mensaje,code)
   }
         
      }
    )
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

  async aviso(header : string,mensaje : string, code : string) {

  const alert = await this.alertController.create({
    header,
    message: code + ' Sorry, ' + mensaje
  });
  await alert.present();  

}




 /* async register( email: string , password: string, name: string) {
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
  
    }*/







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
          let user = res.response;
          this.presentAlert(res.response.identityToken);
        } else {
          //this.presentAlert(0);
          this.router.navigate(['/tabs']);
        }
      })
      .catch((_response) => {
        // this.presentAlert(0);
        this.router.navigate(['/tabs']);
      });



  }


  async presentAlert(x: any) {
    if (x == 0) {
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
