import { Component, OnInit } from '@angular/core';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import {  AlertController , ModalController } from '@ionic/angular';
import { Router  } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})
export class CartComponent  implements OnInit {

respuesta:any
listcupones: boolean = false
cart : boolean = false
user : any
idtoken : any
autenticacion_tipo : any
couponsUser : any
couponsForAll : any
invitacion : boolean = false
totalCifra:any
totalString:any
subtotalCifra:any
subtotalString:any
discountString:any
discountCifra:any
footcart:boolean = false
itemcartServicio:any

vehiculo:any
servicio:any
tipo:any
precio:any
time:any
onsite:any
mobil:any
locationmobil:any
locationonsite:any

cabeza:any
cuponid:any


  constructor(
       private localstorage:StorageService, 
        private alertController: AlertController,
         private router: Router,          
           private modalCtrl: ModalController,
  ) { 

   
  }

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

   isObjectEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0;
} 

    async ionViewWillEnter() {  

  
 this.itemcartServicio = JSON.parse(await this.localstorage.getData('itemcartServicio'))
   let vehiculoData = JSON.parse(await this.localstorage.getData('itemcartVehiculo1'))
    let servicioData = JSON.parse(await this.localstorage.getData('itemcartServicio'))
    let onsiteData = JSON.parse(await this.localstorage.getData('itemcartOnsite'))
     let mobilData = JSON.parse(await this.localstorage.getData('itemcartMobil'))
      let timeData = JSON.parse(await this.localstorage.getData('itemcartTime'))

this.vehiculo = vehiculoData.camiont +" "+ vehiculoData.camionmdl +" NUMBER: "+ vehiculoData.camionn

this.servicio = servicioData.servicio

this.precio = servicioData.precio

this.onsite = onsiteData.donde
this.mobil = mobilData.donde

if(this.onsite == 'nada') {
  this.locationmobil = 'AT YOUR ADDRESS: '+mobilData.address+" "+mobilData.city+" "+mobilData.zip
}
if(this.mobil == 'nada') {
  this.locationonsite = 'AT OUR LOCATION: '+onsiteData.address
}

this.time = timeData.diacita+" "+timeData.horacita


if(this.respuesta == 'si') {

this.listcupones  = true
this.cabeza = 'coupons'
this.cart = false
this.footcart = false

  this.user = JSON.parse(await this.localstorage.getData('usuario'))
  this.idtoken = await this.localstorage.getData('idtoken')
  this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')


    let url1 = 'https://washtt.com/v2_api_clientes_get_coupons.php'
    let data1= { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
    this.cHttps(url1, data1).subscribe(
      async (res: any) => {
     
        let mensaje
        let header
        let code
        switch(res.data.respuesta) {
         
          case 'ERROR':
            code = ''
            header = 'Error'
            mensaje = 'an error occurred,please login again'
            this.localstorage.clearData()
            this.router.navigate(['/login']);
            this.aviso(header, mensaje, code) 
            
           
          break;           

          default:

this.couponsUser = res.data.cuponesUser
this.couponsForAll = res.data.cuponesForAll
    
 if(this.isObjectEmpty(this.couponsUser) && this.isObjectEmpty(this.couponsForAll)) {

  this.invitacion = true
this.listcupones  = false
this.footcart = true
this.subtotalCifra = this.itemcartServicio.costo
this.totalCifra =  this.subtotalCifra  
this.discountCifra = 0.00
}

        }  
      })

}

else if(this.respuesta == 'no') {

this.listcupones  = false
this.cart = true
this.cabeza = 'cart'
this.invitacion = false
this.footcart = true

this.subtotalString = this.itemcartServicio.precio
this.discountString = '00.00 $'
this.totalString = this.subtotalString

this.subtotalCifra = this.itemcartServicio.costo
this.totalCifra =  this.subtotalCifra  
this.discountCifra = 0.00
this.cuponid = 0

}



 
}

  atras() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async selectcoupon(value:any,tipo:any,estado:any,couponid:any) {

if(estado == 'ACTIVE') {
    const formatter$ = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    this.subtotalCifra = this.itemcartServicio.costo

this.subtotalString = this.itemcartServicio.precio
switch(tipo) {
  case 'Porcent':
this.discountCifra = this.subtotalCifra*value/100
  break;  
  case 'Value':
this.discountCifra = value  
  break;
}
this.discountString = formatter$.format(this.discountCifra),
this.totalString = formatter$.format(this.subtotalCifra - this.discountCifra)
this.totalCifra = this.subtotalCifra - this.discountCifra
this.cuponid = couponid

this.listcupones  = false
this.cart = true
this.cabeza = 'cart'
this.invitacion = false
this.footcart = true
}

else if (estado == 'USED') {

            let code = ''
            let header = 'Warning'
            let mensaje = 'Oops! This coupon has already been used'   
            this.aviso(header, mensaje, code) 

this.listcupones  = false
this.cart = true
this.cabeza = 'cart'
this.invitacion = false
this.footcart = true

this.subtotalString = this.itemcartServicio.precio
this.discountString = '00.00 $'
this.totalString = this.subtotalString

this.subtotalCifra = this.itemcartServicio.costo
this.totalCifra =  this.subtotalCifra  
this.discountCifra = 0.00

this.cuponid = 0
}

else if (estado == 'EXPIRED') {
  
            let code = ''
            let header = 'Warning'
            let mensaje = 'Oops! This coupon has expired'   
            this.aviso(header, mensaje, code) 

this.listcupones  = false
this.cart = true
this.cabeza = 'cart'
this.invitacion = false
this.footcart = true

this.subtotalString = this.itemcartServicio.precio
this.discountString = '00.00 $'
this.totalString = this.subtotalString

this.subtotalCifra = this.itemcartServicio.costo
this.totalCifra =  this.subtotalCifra  
this.discountCifra = 0.00
this.cuponid = 0
}

  }

  continue() {
    return this.modalCtrl.dismiss({
      discountCifra:this.discountCifra,
      totalCifra:this.totalCifra,
      subtotalCifra:this.subtotalCifra,
    cuponid:this.cuponid}, 'confirmado');

  }

  /*convertDate(fecha_entrada:any) {
  

  const date = new Date(fecha_entrada);      

  
  // Extraer día, mes y año
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
  const year = date.getFullYear();
  
  // Formato DD-MM-YYYY
  const formattedDate = `${day}-${month}-${year}`;
  
 return formattedDate;

}*/



}
