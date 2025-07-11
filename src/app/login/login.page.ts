import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AutenticacionService} from '../servicios/autenticacion'
import { App } from '@capacitor/app';

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

  




  constructor(
  private alertController: AlertController,
  private router: Router,
 private servicioauth : AutenticacionService,
  private formBuilder: FormBuilder,
  
) { 

  this.form_login = this.formBuilder.group({
    email: [, { validators: [Validators.required]}],
    password: [, { validators: [Validators.required] }]
    
  });

  App.getInfo().then(info=> {
    this.appVersion = info.version
  })

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
  
openAppleSignIn1() {

  this.servicioauth.openAppleSignIn()
  
}

 togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }


  

}


