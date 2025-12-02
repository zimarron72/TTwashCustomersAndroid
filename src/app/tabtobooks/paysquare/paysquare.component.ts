import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { SquareService } from '../../servicios/square.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../servicios/storage.service';
import { LoadingService } from '../../servicios/loading.services';

declare var Square: any;
@Component({
  selector: 'app-paysquare',
  templateUrl: './paysquare.component.html',
  styleUrls: ['./paysquare.component.scss'],
  standalone : false
})
export class PaysquareComponent  implements OnInit {

 idtoken!: string
  autenticacion_tipo!: string
  token_notificacion!: string
  email!: string

  concepto : any
  subtotal : any
  descuento : any

subtotal_string !: string
descuento_string !: string
total_string !: string
  

  total : any
  item : any
  wash : any
  modoS : any
  url : any
  card : any

  constructor(
    private modalCtrl: ModalController,
    private dsls: SquareService, 
    private loading : LoadingService,
    private localstorage: StorageService,
    private alertController: AlertController

  ) { }

  ngOnInit() {}

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

  async ionViewWillEnter() {

    this.loading.simpleLoader()
     //ojo square-sandbox or square segun las credenciales
     
    //await this.dsls.loadScript('square-sandbox')
 await this.dsls.loadScript('square')

  const formatter$ = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  //this.total = parseFloat(this.subtotal) - parseFloat(this.descuento)

  this.subtotal_string =   formatter$.format(this.subtotal)
  this.descuento_string =   formatter$.format(this.descuento)
  this.total_string =   formatter$.format(this.total) 
  
  //async function main() {

//const appId = 'sandbox-sq0idb-RrvT24qkMyTSr91-Qy080w';
 const appId = 'sq0idp-vuSagOWbgJlfqKv2PoID5A';
  const locationId = 'JCQ7Q20HXQTZ8';
 //const locationId = 'JCQ7Q20HXQTZ8';

// const payments = Square.payments(appId, locationId).setLocale('en-US');

const payments = Square.payments(appId, locationId)
    
const paymentsx = payments.setLocale('en-US');
  this.card = await payments.card();     

//  const router = this.router.navigate(['/tipopagos']);

await this.card.attach('#card-container')
this.loading.dismissLoader()




  }

  async ionViewDidLeave() {

    const destroyed = await this.card.destroy();
    (<HTMLInputElement>document.getElementById('payment-status-container')).innerText = '';
    (<HTMLInputElement>document.getElementById('payment-status-container')).innerText = '';
  }


  async eventHandler() {
  this.loading.simpleLoader()
  //  event.preventDefault();
  var user = JSON.parse(await this.localstorage.getData('usuario'))
  var idtoken = await this.localstorage.getData('idtoken')
  var autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo') 
  this.email = user.email;

      const result = await this.card.tokenize();

      if (result.status === 'OK') {

        //console.log(`Payment token is ${result.token}`);
        if(this.modoS == 'TTS') {
        this.url = 'https://www.washtt.com/v1_api_clientes_pagosquareconcargo.php';
        }
        else if(this.modoS == 'FS') {
        this.url = 'https://www.washtt.com/v2_api_clientes_pagoSquareFS.php';
        }
        else if(this.modoS == 'OS') {
        this.url = 'https://www.washtt.com/v2_api_clientes_pagoSquareOS.php';
        }
       
      var data = {
        idtoken : idtoken,
        autenticacion_tipo : autenticacion_tipo,
        umail : this.email,
        concept: this.concepto, 
        subtotal : this.subtotal , 
        descuento : this.descuento, 
        total : this.total ,        
        tip : ((document.getElementById("tip") as HTMLInputElement).value) ,
        nonce : result.token,
          
        
        emid : this.item,
        washid : this.wash,
        charge : 0,
        charge_concepto : 'NA',
        charge_status : 'NA'
      };

        fetch(this.url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => { 
      
(<HTMLInputElement>document.getElementById('payment-status-container')).innerText = 'SORRY BUT THERE ARE TROUBLE PROCESSING PAYMENT';
         
          console.error('Error:', error); 
          
          this.loading.dismissLoader()
     
        } )
        .then(async response => { 

          console.log(response)          
          const destroyed = await this.card.destroy();

          this.loading.dismissLoader()
        let mensaje
        let header
        let code
          switch(response.respuesta) {
            case 'ERROR1':

            code = '01'
            header = 'Error'
            mensaje = response.mensaje
 this.modalCtrl.dismiss(null,'cancel');


            break;
            case 'TOKEN ERROR':
              this.localstorage.clearData()               
              code = '01'
            header = 'Error'
            mensaje = 'Invalid or expired token,please login again'
            this.localstorage.clearData()               
            this.aviso(header, mensaje, code) 
              this.modalCtrl.dismiss({      
      accion : "alogin",   
      },'continue');
            
          break; 
          case 'ERROR2':
            this.localstorage.clearData()              
            code = ''
            header = 'Error'
            mensaje = 'Sorry, an error occurred,please login again2'
            this.localstorage.clearData()               
            this.aviso(header, mensaje, code)  
          this.modalCtrl.dismiss({      
      accion : "alogin",   
      },'continue');
         
          break;
          case 'YA PAGADO':

              code = ''
            header = 'Waiting'
            mensaje = 'There is already a payment registered for this service. Still in verification'
            this.localstorage.clearData()               
            this.aviso(header, mensaje, code)  
          this.modalCtrl.dismiss({      
      accion : "tipopagos",   
      },'continue');             
             
            break;
           
            case 'TODO_OK':
             // (<HTMLInputElement>document.getElementById('payment-status-container')).innerText = 'COMPLETED PAYMENT';
             code = ''
            header = 'Success'
            mensaje = 'Thank you for your payment.'
            this.localstorage.clearData()               
            this.aviso(header, mensaje, code) 
              this.modalCtrl.dismiss({      
      accion : "successpay",   
      },'continue');   
            
            break;
            
            case 'PAGO CONDICIONADO':      
             

               code = ''
            header = 'Waiting'
            mensaje = 'A difficulty occurred with this transaction. However please give us some time to verify the same'
            this.localstorage.clearData()               
            this.aviso(header, mensaje, code)  
          this.modalCtrl.dismiss({      
      accion : "successpaycond",   
      },'continue');      

            break;  

          }


       /*borrarif(response.respuesta = 'EXCEPCION2') {
          this.snackBar.open("Please login again", "Close",
          {       
            horizontalPosition: "start",
            verticalPosition: "top",
          }
          );
        }

        else {

          this.router.navigate(['/tabs-cliente/tobook/tipopagos']);

        }*/

//(<HTMLInputElement>document.getElementById('payment-status-container')).innerText = 'COMPLETED PAYMENT';

        
          
      //    console.log('Success:', response); 

     
       
         
        
        });





       }


       

  }
 

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  

}
