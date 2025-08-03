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

  

    togglePasswordVisibility1() {
      this.showPassword1 = !this.showPassword1;
    }

    togglePasswordVisibility2() {
      this.showPassword2 = !this.showPassword2;
    }

  send() {
    if (this.form_registro.valid) {
  
   var name=  this.form_registro.get("name")?.value;
    var password1 =  this.form_registro.get("password1")?.value;
    var password2 =  this.form_registro.get("password2")?.value;
    var email =  this.form_registro.get("email")?.value;

    if(password1 != password2) {
      this.form_registro.patchValue({password2 : ''})
      let header = 'Warning'
      let mensaje = 'There is no match between the passwords entered'
      let codigo = ''
    this.aviso(header,mensaje,codigo)
    
    }
    else {
      return this.servicioauth.register(email,password1,name)
    }

   
    }
    else {
      let header = 'Warning'
      let mensaje = 'Please Fill all  fields'
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
