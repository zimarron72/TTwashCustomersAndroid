import { Component, OnInit } from '@angular/core';
import {   ModalController, AlertController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { LoadingService } from '../servicios/loading.services';

@Component({
  selector: 'app-passwordapple1',
  templateUrl: './passwordapple1.page.html',
  styleUrls: ['./passwordapple1.page.scss'],
  standalone:false
})
export class Passwordapple1Page implements OnInit {
elemento = {
   password1: "",
   password2: "",   
  }

   showPassword1: boolean = false;
  showPassword2: boolean = false;

  email:any
  tipo:any
  idtoken:any
  

  ErrorMessage:any
  constructor(
       private modalCtrl: ModalController,
      private alertController: AlertController,
      private loading: LoadingService,
  ) { }

  ngOnInit() {
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

 cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

 

   togglePasswordVisibility1() {
      this.showPassword1 = !this.showPassword1;
    }

    togglePasswordVisibility2() {
      this.showPassword2 = !this.showPassword2;
    }

validateForm() {

  
    const hasUppercase = /[A-Z]/.test(this.elemento.password1);
    const hasLowercase = /[a-z]/.test(this.elemento.password1);
    const hasNumber = /[0-9]/.test(this.elemento.password1);
    const hasSimbol = /[!@#$%^&*]/.test(this.elemento.password1);
    const uname = new String(this.elemento.password1) 
  
   
    

    var ValidationFlag = true

 
  if (this.elemento.password1 === '') {
      this.ErrorMessage = "Establezca un valor de contraseña para su cuenta. Con Mínimo 8 caracteres, al menos una letra Mayúscula, una minúscula y un símbolo !@#$%^&*";
      ValidationFlag = false;
    }


    else if (uname.length < 8) {
      this.ErrorMessage = "La contraseña debe contener mínimo 8 caracteres";
      ValidationFlag = false;
    }
    else if (!hasUppercase) {
      this.ErrorMessage = "La contraseña debe contener al menos un letras Mayúscula";
      ValidationFlag = false;
    }
    else if (!hasLowercase) {
      this.ErrorMessage = "La contraseña debe contener al menos un letras minúscula";
      ValidationFlag = false;
    }
    else if (!hasNumber) {
      this.ErrorMessage = "La contraseña debe contener al menos un número";
      ValidationFlag = false;
    }
    else if (!hasSimbol) {
      this.ErrorMessage = "La contraseña debe contener al menos un símbolo: $%#";
      ValidationFlag = false
    }
    else if(this.elemento.password1 != this.elemento.password2) {
      this.ErrorMessage = "Las contraseñas no coinciden";
      ValidationFlag = false;
    }
    else {}

   

    return (ValidationFlag) ? true : false;
    

  }

 async continue() {

   if (this.validateForm()) {
this.loading.simpleLoader()
  var url = "https://washtt.com/v1_api_clientes_loginapple_registro.php"
            var data1 = { 
              email: this.email,
              idtoken : this.idtoken,
              tipo:this.tipo,
              password : this.elemento.password1
             }
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
                  case 'OK':
                  this.modalCtrl.dismiss( {userid : res.data.userid}, 'continue');
                    
                  break; 
                 
              
                     
               


                }
                             
              }
            )



   }
else {
    let mensaje      
      mensaje = this.ErrorMessage
      await this.aviso("",mensaje,"")

     
}


    
  } 


}
