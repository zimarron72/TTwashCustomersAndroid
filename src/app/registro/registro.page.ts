import { Component  } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AutenticacionService} from '../servicios/autenticacion'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage   {

  form_registro!: FormGroup
  verboton : boolean = false
  password: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;
ErrorMessage :any
  respuesta! : string

  constructor(
    private alertController: AlertController,
    private router: Router,
   private servicioauth : AutenticacionService,
    private formBuilder: FormBuilder,
  ) {  
      this.form_registro = this.formBuilder.group({
        name: [, { validators: [Validators.required]}],     
        email: [, { validators: [Validators.required]}],
        password1: [, { validators: [Validators.required] }],
        password2: [, { validators: [Validators.required] }]
      });
   }

validateForm() {

    var name=  this.form_registro.get("name")?.value;
    var password1 =  this.form_registro.get("password1")?.value;
    var password2 =  this.form_registro.get("password2")?.value;
    var email =  this.form_registro.get("email")?.value;
  
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasUppercase = /[A-Z]/.test(password1);
    const hasLowercase = /[a-z]/.test(password1);
    const hasNumber = /[0-9]/.test(password1);
    const hasSimbol = /[!@#$%^&*]/.test(password1);
    const uname = new String(password1) 
  
   
    

    var ValidationFlag = true
if(name == "") {
this.ErrorMessage = "Please provide your first and last name.";
      ValidationFlag = false;
}

if(email == "") {
this.ErrorMessage = "Please provide an email address for your account.";
      ValidationFlag = false;
}

else if (!emailRegex.test(email)) {
      this.ErrorMessage = "Please provide a valid email address.";
      ValidationFlag = false;
    }
 
  else if (password1 === '') {
      this.ErrorMessage = "Set a password for your account. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one symbol !@#$%^&*";
      ValidationFlag = false;
    }


    else if (uname.length < 8) {
      this.ErrorMessage = "The password must contain at least 8 characters";
      ValidationFlag = false;
    }
    else if (!hasUppercase) {
      this.ErrorMessage = "The password must contain at least one uppercase letter";
      ValidationFlag = false;
    }
    else if (!hasLowercase) {
      this.ErrorMessage = "The password must contain at least one lowercase letter";
      ValidationFlag = false;
    }
    else if (!hasNumber) {
      this.ErrorMessage = "The password must contain at least one number";
      ValidationFlag = false;
    }
    else if (!hasSimbol) {
      this.ErrorMessage = "The password must contain at least one symbol, for example: $%#";
      ValidationFlag = false
    }
    else if(password1 != password2) {
      this.ErrorMessage = "The passwords do not match";
      ValidationFlag = false;
    }
    else {}

   

    return (ValidationFlag) ? true : false;
    

  }

    togglePasswordVisibility1() {
      this.showPassword1 = !this.showPassword1;
    }

    togglePasswordVisibility2() {
      this.showPassword2 = !this.showPassword2;
    }

  async send() {
    if (this.validateForm()) {
  
   var name=  this.form_registro.get("name")?.value;
    var password1 =  this.form_registro.get("password1")?.value;
    var email =  this.form_registro.get("email")?.value;



      return this.servicioauth.register(email,password1,name)  
    }
    else {
      let header = 'Warning'
      let mensaje = this.ErrorMessage
      let codigo = ''
    this.aviso(header,mensaje,codigo)
    }
  }

  cancel() {
    this.router.navigate(['login']);
  }


  async aviso(header : string,mensaje : string, code : string) {

    const alert = await this.alertController.create({
      header,
      message: code + ' Sorry, ' + mensaje,
      buttons: ['OK'],
    });
    await alert.present();  
  
  }



}
