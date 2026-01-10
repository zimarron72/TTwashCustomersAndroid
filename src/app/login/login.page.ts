import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AutenticacionService} from '../servicios/autenticacion'
import { App } from '@capacitor/app';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../servicios/storage.service';
import { WonderPush } from '@awesome-cordova-plugins/wonderpush/ngx';
import { LoadingService } from '../servicios/loading.services';
import { Device } from '@capacitor/device';
//import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
/*import {
  SignInWithApple
} from '@capacitor-community/apple-sign-in';*/

import { 
   OAuthProvider,
   signInWithCredential,
   AuthCredential,
   getAuth
  } from '@angular/fire/auth';

interface User {
  name: string;
  email: string;
  userid: string;
  iDevices: string;
}


@Component({

  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage  {

appVersion: any
  
  form_login!: FormGroup
  showPassword: boolean = false;

 ID:any 




  constructor(
  private alertController: AlertController,
  private router: Router,
 private servicioauth : AutenticacionService,
  private formBuilder: FormBuilder,
  private localstorage: StorageService,
  private wonderPush: WonderPush,
 private loading: LoadingService,
) 

{ 

  this.form_login = this.formBuilder.group({
    email: [, { validators: [Validators.required]}],
    password: [, { validators: [Validators.required] }]
    
  });

  App.getInfo().then(info=> {
    this.appVersion = info.version
  })

}

  async getIdevice() {

  const info = await Device.getId().then(
    (res)=> {
      console.log(res)
    }
  ).catch(
    (err)=> {
      console.log(err)
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
if(code == '') {
  const alert = await this.alertController.create({
    header,
    message: mensaje,
    buttons: ['OK'],
  });
  await alert.present();  
}
else {
  const alert = await this.alertController.create({
    header,
    message: code + ' Sorry, ' + mensaje,
    buttons: ['OK'],
  });
  await alert.present();  
}
}
   async presentAlert2(mensaje: any) {
    
      const alert = await this.alertController.create({
        header: 'Apple',
        message: mensaje,
        buttons: ['OK'],
      });
      await alert.present();
    

  }



////////LFIREBASE EMAIL-CONTRASENA///////
 async send() {

  if (this.form_login.valid) {

  
    var email = this.form_login.get("email")?.value;
      var password = this.form_login.get("password")?.value;
      this.servicioauth.login(email,password)
  
    }
  
    else {
      const alert = await this.alertController.create({
        header: 'Warning',
        message: 'Please complete your information',
        buttons: ['OK'],
      });
      await alert.present(); 
    }
  


 }

registro () {

      this.router.navigate(['registro']);
     }
   
resetpassword (){
   
       this.router.navigate(['resetpassword']);
     }



 togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }

 /*async openGoogleSignIn()  {

   const x = await GoogleAuth.signIn()
        //alert(res.authentication.idToken)
 const auth = getAuth();  
 const idToken = x.authentication.idToken;
 const provider = new OAuthProvider('google.com')
 const credential = provider.credential(
  {
    idToken : idToken
  }
 )
 const userCredential =  signInWithCredential(auth, credential as AuthCredential).then(
(res)=> {
  this.localstorage.setObject('usuario', res.user)
 this.localstorage.setData('idtoken',res.user.getIdToken)
this.loading.simpleLoader()
  var url = "https://washtt.com/v1_api_clientes_logingoogle.php"
            var data1 = { email: res.user.email, idtoken : res.user.getIdToken }
            this.cHttps(url, data1).subscribe(
              async (res1: any)  => {
                this.loading.dismissLoader()
                let mensaje
                let header
                let code
                switch (res1.data.respuesta) {
                case 'ERROR':
                      code = '01'
                  header = 'Error'              
                  mensaje = 'an error occurred,please login again'
                  this.aviso(header,mensaje,code)   
                      
                  break;            
                  case 'TODO_OK':
                    this.wonderPush.setUserId(res1.data.userid)
                    this.wonderPush.addTag('clientes')
                    await this.localstorage.setData('autenticacion_tipo', 'google');                   
                    this.router.navigate(['/tabs/tabtobooks']);              
                    
                  break; 
                  case 'NOT_CUSTOMER':
                code = '01'
                  header = 'Error' 
                  mensaje = 'Uuups!, an account with this email address already exists, associated with the TTwash Jobs app. Therefore, for this app (TTwash Customers), you must use a different email address.'                     
                  this.aviso(header,mensaje,code)
                

                  break;
                  case 'GETPASSWORD':

                  this.password1(res.user.email, res.user.getIdToken)  
              
                   
                 
               
                      
                break;
              

                }
                             
              }
            )

}



 )
}*/


}


