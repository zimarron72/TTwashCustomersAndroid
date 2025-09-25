import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { LoadingService } from '../servicios/loading.services';
import { StorageService } from './storage.service';

import { WonderPush } from '@awesome-cordova-plugins/wonderpush/ngx';


import { Auth, 
  signInWithEmailAndPassword,
   createUserWithEmailAndPassword, 
   signOut,
   sendPasswordResetEmail,
   getAuth, 
  
  
  } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})



export class AutenticacionService {

 user:any 

  

  constructor(
    private auth: Auth,
    private router: Router,
    private alertController: AlertController,
    private localstorage: StorageService,
    private loading: LoadingService,
    
    
    private wonderPush: WonderPush,
  ) { }
  
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

   async presentAlert2(mensaje: any) {
    
      const alert = await this.alertController.create({
        header: 'Apple',
        message: mensaje,
        buttons: ['OK'],
      });
      await alert.present();
    

  }

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

                    this.wonderPush.setUserId(res.data.userid)
                    this.wonderPush.addTag('clientes')
                    await this.localstorage.setData('autenticacion_tipo', 'correo_pass');                   
                  this.router.navigate(['pasos/wellcome'])
                    // this.router.navigate(['/tabs/tabtobooks']); viejo
                    break;

                  case 'TOKEN ERROR':

                  code = '01'
                  header = 'Error' 
                  mensaje = 'Invalid or expired token,please login again'
                  this.aviso(header,mensaje,code)                       
                  break;  

                     case 'NO EXISTE':
                  code = '01'
                  header = 'Error' 
                  mensaje = 'Uuups!, there is no longer an account registered with this email address. Please register again.'                     
                  this.aviso(header,mensaje,code)
                  break;     

                  case 'NOT_CUSTOMER':
                  code = '01'
                  header = 'Error' 
                  mensaje = 'Uuups!, an account with this email address already exists. Therefore, for this app (TTwash Customers), you must use a different email address.'                     
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



register(email: string , password: string, name: string) {
  this.loading.simpleLoader()
  createUserWithEmailAndPassword(this.auth, email, password).then(
    async (res) => {
       let user = res.user
       await this.localstorage.setObject('usuario',user)
       user.getIdToken(false).then(
 async (response:string) => {
  let idtoken = response
  await this.localstorage.setData('idtoken',idtoken)
var url = "https://washtt.com/v1_api_clientes_registro.php"    
      var data1 = { email: email, password: password, name : name }
      this.cHttps(url, data1).subscribe(
        async (res1: any) => {
           this.loading.dismissLoader() 
          let mensaje
          let header
          let code
          switch (res1.data.respuesta) {
            case 'ERROR': 
         
                code = '02'
                header = 'Error'              
                mensaje = 'an error occurred,please try again' + res1.data.mensaje
                this.aviso(header,mensaje,code) 
             
                                      
            break;
            case 'DUPLICADO_USUARIO':
                  code = '01'
                  header = 'Error' 
                  mensaje = 'Uuups!, an account with this email address already exists. Therefore, you must use a different email address.'                     
                  this.aviso(header,mensaje,code)
            break;              
            case 'OK':
              this.wonderPush.setUserId(res1.data.userid)
              this.wonderPush.addTag('clientes')
              await this.localstorage.setData('autenticacion_tipo', 'correo_pass');
             
             this.router.navigate(['pasos/comienzo']);
              break;  
              
              

            default:
              res.user.delete().then(
                (cat) => {
                  code = '02'
            header = 'Error' 
            mensaje = 'something is wrong right now. Please try again later.' 
            this.aviso(header,mensaje,code)
                }
              )
                 
          }
                        
        }
      )


 })
    })
}

 
resetpassword(email : string) {
  this.loading.simpleLoader()  
  sendPasswordResetEmail(this.auth,email).then(() => {
    // Password reset email sent!
    // ..
    this.loading.dismissLoader()   

    let  code = ''
    let header = 'Notice' 
     let mensaje = 'An email has been sent to your account to recover your password'
     this.aviso(header,mensaje,code)        
    this.router.navigate(['login']);

  }).catch((error) => {
    this.loading.dismissLoader() 
   
    let  code = '04'
    let header = 'Error' 
    let mensaje
    switch(error.code) {
      case 'auth/invalid-email':
        mensaje = 'Invalid email'
       
      break;
      case 'auth/invalid-email':
        mensaje = 'User not found'
       
      break;

      default:
       mensaje = 'there is a problem, please try again later.'
      
    }
     
    this.aviso(header,mensaje,code) 
    
    // ..
  });
}

  logout_regular() {
    signOut(this.auth).then(
(_res) => {
 // alert('salirda')
  this.localstorage.clearData
  this.router.navigate(['/login']);
})
  }




  /////////////AUTHENTICATION APPLE/////////////////////
//SE ESTABLECIO EN LA PAGINA DE LOGIN DIRECTAMENTE
///////////////////////////////////////////////





  async borrarCuenta() {
const auth = getAuth();
const user = auth.currentUser;
this.user = user
await user?.delete().then(
  ()=>{
 var url = 'https://washtt.com/v1_api_clientes_deleteCuenta.php'
    var data1 = {  email: this.user.email }
    this.cHttps(url, data1).subscribe(
      async (res: any) => {
    
        console.log(res)
        let mensaje
        let header
        let code
        switch (res.data.respuesta) {
          case 'ERROR':
            code = '01'
            header = 'Error'
            mensaje = 'an error occurred,please login again'
            this.localstorage.clearData()
            this.router.navigate(['/login'])       
            this.aviso(header, mensaje, code)              
            break;         
          case 'TOKEN ERROR':
          code = '01'
          header = 'Error' 
          mensaje = 'Invalid or expired token,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header,mensaje,code)                       
          break;            
          case 'OK':   
            code = ''
          header = '' 
          mensaje = 'Your account deletion has been successfully completed. Thank you for your preference.'
         this.aviso(header,mensaje,code) 
          this.localstorage.clearData()
          this.router.navigate(['/delete-cuenta/encuesta'])   
          break;  
        }
                      
      }
    )
})

  }







}
