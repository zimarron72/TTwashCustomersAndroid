import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../../servicios/storage.service';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { LoadingService } from '../../servicios/loading.services';
import {AutenticacionService} from '../../servicios/autenticacion'
@Component({
  selector: 'app-perfilmobil',
  templateUrl: './perfilmobil.component.html',
  styleUrls: ['./perfilmobil.component.scss'],
  standalone:false
})
export class PerfilmobilComponent  implements OnInit {

   array = {
    mobilephone: "",  
    firstname: "",  
    lastname: "",  
  }
 
  user! : any
  idtoken! : any
  autenticacion_tipo : any
  ErrorMessage : any
  constructor(
    private alertController: AlertController,
  private router: Router,
  private localstorage: StorageService,
    private loading: LoadingService,
     private AutenticacionService : AutenticacionService,
  ) {

    
 

   }

  async ngOnInit() {

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

  async aviso(header : string, mensaje : string, code : string) {
              if (code == '') {
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


 

validateForm() {

    var ValidationFlag = true

 if (this.array.mobilephone == "") {
      this.ErrorMessage = "Please provide your cell phone number.";
      ValidationFlag = false;
    }

     else if (this.array.firstname == "") {
      this.ErrorMessage = "Please provide your first name.";
      ValidationFlag = false;
    }

    else if (this.array.lastname == "") {
      this.ErrorMessage = "Please provide your last name.";
      ValidationFlag = false;
    }

   
     else {}


    return (ValidationFlag) ? true : false;
  }  

  salir() {
 this.AutenticacionService.logout_regular()
}

  async continue() {




  if (this.validateForm()) {
this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
        this.loading.simpleLoader()
              var url = 'https://washtt.com/v1_api_clientes_ingresoperfil_inicio.php'
              var data1 = { 
                idtoken: this.idtoken,
                autenticacion_tipo: this.autenticacion_tipo,
                email: this.user.email,
                nombres :this.array.firstname,
                apellidos : this.array.lastname,
                mobilphone : this.array.mobilephone

               }
              this.cHttps(url, data1).subscribe(
                async (res: any) => {
                  this.loading.dismissLoader()
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
                               
                    case 'OK':
                   
                    this.router.navigate(['/pasos/wellcome']);
                    break; 
                    
                  }
                                
                }
              )  
  
    }
  
    else {
      const alert = await this.alertController.create({
        header: '',
        message: this.ErrorMessage,
        buttons: ['OK'],
      });
      await alert.present(); 
    }

}

mascaraDeTelefono(event:any){
    
   
   const textoActual = event.target.value;
    const isCelular = textoActual.length === 11;
   
        if(isCelular) {
        const parte1 = textoActual.slice(0,4);
        const parte2 = textoActual.slice(4,7);
        const parte3 = textoActual.slice(7,9);
        const parte4 = textoActual.slice(9,11);
        var textoAjustado = parte1+'-'+parte2+'-'+parte3+'-'+parte4 
        } else {
         var textoAjustado = ""
        }
        
        this.array.mobilephone = textoAjustado
        
        
        
}

}
