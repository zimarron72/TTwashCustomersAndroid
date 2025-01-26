import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../../servicios/storage.service';


@Component({
  selector: 'app-putprofile',
  templateUrl: './putprofile.component.html',
  styleUrls: ['./putprofile.component.scss'],
  standalone: false
})
export class PutprofileComponent  implements OnInit {

  form_profile!: FormGroup
  user! : any
  idtoken! : any
  autenticacion_tipo : any
  
  constructor(
    private alertController: AlertController,
  private router: Router,
  private formBuilder: FormBuilder,
  private localstorage: StorageService,
  ) {

    this.form_profile = this.formBuilder.group({

      firtsname: [, { validators: [Validators.required]}],
      lastname: [, { validators: [Validators.required] }],
      mobilephone: [, { validators: [Validators.required] }],
      
    });

   }

  async ngOnInit() {

    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
  }

  async ionViewWillEnter() {  
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
  }

  async continue() {

  if (this.form_profile.valid) {


  
    var firtname = this.form_profile.get("firtname")?.value;
    var lastname = this.form_profile.get("lastname")?.value;
    var celular = this.form_profile.get("mobilephone")?.value;
    
  
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

}
