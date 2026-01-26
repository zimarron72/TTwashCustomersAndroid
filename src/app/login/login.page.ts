import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AutenticacionService} from '../servicios/autenticacion'
import { App } from '@capacitor/app';




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

    async openGoogleSignIn() {

 this.servicioauth.signGoogle()

    }


 


}


