import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import {AutenticacionService} from '../servicios/autenticacion'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
  standalone: false
})
export class ResetpasswordPage  {

  form_reset : FormGroup


  constructor(
    private alertController: AlertController,
    private router: Router,
   private servicioauth : AutenticacionService,
    private formBuilder: FormBuilder,
  ) {

    this.form_reset = this.formBuilder.group({
      email: [, { validators: [Validators.required]}]    
      
    });

   }

   async send() {
 
    if (this.form_reset.valid) {
  
    
    var email = this.form_reset.get("email")?.value;
     
      return this.servicioauth.resetpassword(email)
  
    }
  
    else {
     
      const alert = await this.alertController.create({
        header: 'Warning',
        message: 'Please enter the correct email associated with your account',
        buttons: ['OK'],
      });
      await alert.present(); 
    }
  
    }




 cancel() {

      this.router.navigate(['/login']);
    
    }

}
