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
import {
  SignInWithApple
} from '@capacitor-community/apple-sign-in';

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
  private modalCtrl: ModalController,
  private localstorage: StorageService,
  private wonderPush: WonderPush,
 private loading: LoadingService,
) { 

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

/////////////LOGIN APPLE////////////////// 
  
  async openAppleSignIn1()  {

SignInWithApple.authorize().then(async (res) => {
        if (res.response && res.response.identityToken) {

 const auth = getAuth();         
const idToken = res.response.identityToken;
this.ID = res.response.user
 const provider = new OAuthProvider('apple.com')
 const credential = provider.credential(
  {
    idToken : idToken
  }
 )
 const userCredential = await signInWithCredential(auth, credential as AuthCredential);
console.log("User signed in:", userCredential.user.email);

 await this.localstorage.setObject('usuario',userCredential.user)
 await this.localstorage.setData('idtoken',idToken)
this.loading.simpleLoader()
  var url = "https://washtt.com/v1_api_clientes_loginapple.php"
            var data1 = { email: userCredential.user.email, idtoken : idToken, idDevice : this.getIdevice }
            this.cHttps(url, data1).subscribe(
              async (res: any)  => {
                this.loading.dismissLoader()
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
                  case 'OK_LOGIN':
                  var DataUser  = {
                  iDevices :res.data.iDevices,
                  email : res.data.email,
                  name : res.data.name,
                  userid : res.data.userid
                  }
                  await this.localstorage.setObject('usuario',DataUser)
                    this.wonderPush.setUserId(res.data.userid)
                    this.wonderPush.addTag('clientes')
                    await this.localstorage.setData('autenticacion_tipo', 'apple');                   
                    this.router.navigate(['/pasos/wellcome']);              
                    
                  break; 
                   case 'OK_REGISTER':
                  var DataUser  = {
                  iDevices :res.data.iDevices,
                  email : res.data.email,
                  name : res.data.name,
                  userid : res.data.userid
                  }
                  await this.localstorage.setObject('usuario',DataUser)
                    this.wonderPush.setUserId(res.data.userid)
                    this.wonderPush.addTag('clientes')
                    await this.localstorage.setData('autenticacion_tipo', 'apple');                   
                    this.router.navigate(['pasos/comienzo']);           
                    
                  break; 
                  case 'NOT_CUSTOMER':
                code = '01'
                  header = 'Error' 
                  mensaje = 'Oops! An account is already associated with the TTwash Jobs app. Therefore, for this app (TTwash Customers), you must use a different email address or device.'                     
                  this.aviso(header,mensaje,code)
                

                  break;
                 
              

                }
                             
              }
            )

        } else {
this.loading.dismissLoader()
      
        }
      })
      .catch(() => {
      
       this.loading.dismissLoader()
       
      });
  
}

 togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }

  
  



}


