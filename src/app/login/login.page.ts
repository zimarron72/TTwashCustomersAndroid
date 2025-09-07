import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AutenticacionService} from '../servicios/autenticacion'
import { App } from '@capacitor/app';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { Passwordapple1Page } from '../passwordapple1/passwordapple1.page';
import { StorageService } from '../servicios/storage.service';
import { WonderPush } from '@awesome-cordova-plugins/wonderpush/ngx';
import { LoadingService } from '../servicios/loading.services';

import {
  SignInWithApple
} from '@capacitor-community/apple-sign-in';

import { 
   OAuthProvider,
   signInWithCredential,
   AuthCredential,
   getAuth
  } from '@angular/fire/auth';



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
            var data1 = { email: userCredential.user.email, idtoken : idToken }
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
                  case 'TODO_OK':
                    this.wonderPush.setUserId(res.data.userid)
                    this.wonderPush.addTag('clientes')
                    await this.localstorage.setData('autenticacion_tipo', 'apple');                   
                    this.router.navigate(['/tabs/tabtobooks']);              
                    
                  break; 
                  case 'NOT_CUSTOMER':
                code = '01'
                  header = 'Error' 
                  mensaje = 'Uuups!, an account with this email address already exists, associated with the TTwash Jobs app. Therefore, for this app (TTwash Customers), you must use a different email address.'                     
                  this.aviso(header,mensaje,code)
                

                  break;
                  case 'GETPASSWORD':

                  this.password1(userCredential.user.email,idToken, this.ID )  
              
                   
                 
               
                      
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

  async password1(email:string | null ,idtoken:string, ID:any) {
    const modal = await this.modalCtrl.create({
                    component: Passwordapple1Page,
                     componentProps: { 
                     email: email,
                     idtoken: idtoken,
                     tipo: 'apple' ,
                      ID: ID                
                    }
                  });
                  modal.present();
              
                  const { data, role } = await modal.onWillDismiss();

                  if(role === 'continue') {
                    
                    this.wonderPush.setUserId(data.userid)
                    this.wonderPush.addTag('clientes')
                    await this.localstorage.setData('autenticacion_tipo', 'apple');                   
                    this.router.navigate(['/tabs/tabtobooks']);      
                     
                  }

                }
  

}


