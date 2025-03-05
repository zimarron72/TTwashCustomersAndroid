import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import {  AlertController ,  ModalController } from '@ionic/angular';
import { LoadingService } from '../../servicios/loading.services';
import { Router } from '@angular/router';
import {CuponComponent } from '../cupon/cupon.component';

interface Transaction {
  vacio: string,
  concepto: string;
  cost: string;
}


interface Datadescuento {

  type : number;
  valor : number;
  mensaje: string;
  respuesta: string;


}

interface Datacupon {

  type : number;
  valor : number;


}



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone:false
})
export class CartComponent  implements OnInit {

  datadescuento! : Datadescuento
  datacupon! : Datacupon
  subtotal!: number
  sitescliente! : any[]
  vehiculoscliente! : any[]
  servicio: any
  itemcart: any | null = null
  nombreservicio: any
  itemOrdera: any
  site: any
  vehicle: any 
  diasemana! : string
  descuentos_recargos : any
  precio_yarda! : string
  precio_mobil! : string
  precioyarda! : number
  preciomobil! : number   
    ocultarcupon! : boolean
    vermensaje! : boolean
    vercart! : boolean
    itemOrder: any | null = null
    itemOrderCart: any
    transactions!: Transaction[] 

  constructor(
    private localstorage:StorageService,
    private modalCtrl: ModalController,
    private router: Router,
    private alertController: AlertController,
    private loading: LoadingService,
  ) {
    
   }

  ngOnInit() {}

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

  async ionViewWillEnter() {

    const formatter$ = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    this.vercart = false
    this.vermensaje = false

// DATOS DE NUEVO ITEM PARA EL CART
this.itemcart =  JSON.parse(await this.localstorage.getData('itemcart'))
 // DATOS ITEMS ALMACENADOS EN LOCAL DEL CARRITO ********************
this.itemOrder = JSON.parse(await this.localstorage.getData('itemOrder')) 

var type = ''


if(this.itemcart == null && this.itemOrder == null)

  {
    console.log('el itemcart es nullo?'+this.itemcart)
    console.log('el itemOrder es nullo?'+this.itemOrder)
    this.vercart = false
    this.vermensaje = true
  }

  else {

    console.log('el itemcart es ?'+this.itemcart)
    console.log('el itemOrder es?'+this.itemOrder)
    this.vercart = true
    this.vermensaje = false
    
  
  
  if(this.itemOrder == null) { // NO HAY ITEMS
  
   if(this.itemcart.donde == 1) {
  
    type = 'Onsite'
  
   }
  
   else {
  
   type = 'Mobile'
  
   }
  
  this.itemOrder = [{
   index : 0,
   type : type, // mobil or onsite
   donde : this.itemcart.donde, // 1 onsite 2 mobil
   Location : this.itemcart.location, // nombre de la  yarda o el id de la localizacion
   Unit : this.itemcart.camionn,
   Vehicle : this.itemcart.camiont,
   camionmodelo : this.itemcart.camionmdl,
   camioncolor : this.itemcart.camioncolor,
   camionmark : this.itemcart.camionmar,
   license : this.itemcart.license,
   Service : this.itemcart.servicio, // nombre del servicio y el vehiculo
   detalles : this.itemcart.camiondetalles,   
   Date : this.itemcart.diacita,
   Hour : this.itemcart.horacita,
   Price : this.itemcart.price, // precio en string flotante
   costo : this.itemcart.costo, // precio en numero
   sitioid: this.itemcart.sitioid, // 0 en onsite y id localizacion en mobil
   vehiculoid: this.itemcart.vehiculoid,
   servicioid: this.itemcart.servicioid,
   power : this.itemcart.power,
   water : this.itemcart.water,
   ensitio : this.itemcart.presencia, // solo mobil e indica si cliente estara presente
   favorito : this.itemcart.favorito, // solo mobil e indica si el sitio es el principal
   suite: this.itemcart.suite, // De aqui para abajo solo mobil
   street: this.itemcart.street,
   address: this.itemcart.address,
   zip: this.itemcart.zip,
   state: this.itemcart.state,
   city: this.itemcart.city,
  }]
  
  
  
  }
  
  else { // SI HAY ITEMS
  
  if(this.itemcart !== null ) { // SE DEBE SUMAR UN ITEM NUEVO
  
  var indexnew = this.itemOrder.length;
  
  if(this.itemcart.donde == 1) {
  
    type = 'Onsite'
  
   }
  
   else {
  
   type = 'Mobile'
  
   }
  
  this.itemOrder.push({
  index : indexnew,
  type : type, // mobil or onsite
  donde : this.itemcart.donde, // 1 onsite 2 mobil
  Location : this.itemcart.location, // nombre de la  yarda o el id de la localizacion
  Unit : this.itemcart.camionn,
  Vehicle : this.itemcart.camiont,
  camionmodelo : this.itemcart.camionmdl,
  camioncolor : this.itemcart.camioncolor,
  camionmark : this.itemcart.camionmar,
  license : this.itemcart.license,
  Service : this.itemcart.servicio, // nombre del servicio y el vehiculo
  detalles : this.itemcart.camiondetalles,   
  Date : this.itemcart.diacita,
  Hour : this.itemcart.horacita,
  Price : this.itemcart.price, // precio en string flotante
  costo : this.itemcart.costo, // precio en numero
  sitioid: this.itemcart.sitioid, // 0 en onsite y id localizacion en mobil
  vehiculoid: this.itemcart.vehiculoid,
  servicioid: this.itemcart.servicioid,
  power : this.itemcart.power,
  water : this.itemcart.water,
  ensitio : this.itemcart.presencia, // solo mobil e indica si cliente estara presente
  favorito : this.itemcart.favorito, // solo mobil e indica si el sitio es el principal
  suite: this.itemcart.suite, // De aqui para abajo solo mobil
  street: this.itemcart.street,
  address: this.itemcart.address,
  zip: this.itemcart.zip,
  state: this.itemcart.state,
  city: this.itemcart.city,
  
   });
  }
  
  
  
  
  }
  
  
  //**************************************************************************************** */
  // SE CUIDA QUE NO EXISTAN ITEM VACIO BORRADOS EN LA TABLA
  var itemsinvaciosOrderx = this.itemOrder.filter((word: { Price: any; }) => word.Price !== undefined )
  this.itemOrderCart = itemsinvaciosOrderx;
  
  // CALCULAMOS EL SUBTOTAL PARA LA TABLA INFERIOR
 this.subtotal =  itemsinvaciosOrderx.map((x: { costo: any; }) => x.costo).reduce((a: any, b: any) => (a + b))
  
  // OBTENEMOS LOS DATOS DE LOS CUPONES DE DESCUENTO****************************
  //this.datacupon = JSON.parse(localStorage.getItem('datacupon'));
 this.localstorage.getData('datacupon').then(
  (data)=> this.datacupon = JSON.parse(data)
  )
  
 this.datacupon = JSON.parse(await this.localstorage.getData('datacupon'))
  
  if(this.datacupon != null) {  
    this.ocultarcupon = false
    // DATOS A LA TABLA INFERIOR  
    if(this.datacupon.type == 0) {  
    var descuento = this.datacupon.valor * this.subtotal * -1 / 100   
    }
    else {
     var descuento =  this.datacupon.valor * -1  
    }  
    var total = this.subtotal + descuento
    let subtotal = formatter$.format(this.subtotal)
    let descuentx = formatter$.format(descuento)
    let totalx = formatter$.format(total)

    this.transactions = [
    {vacio : '', concepto: 'Subtotal', cost: subtotal },
    {vacio : '', concepto: 'Discount', cost: descuentx},
    {vacio : '', concepto: 'Total', cost: totalx}
    ]; 
  }
  else {
  
  this.ocultarcupon = true
  var total = this.subtotal
  let subtotal = formatter$.format(this.subtotal)
  let descuento = formatter$.format(0)
  let totalx = formatter$.format(total)
  // DATOS A LA TABLA INFERIOR
  this.transactions = [
  {vacio : '', concepto: 'Subtotal', cost: subtotal },
  {vacio : '', concepto: 'Discount', cost: descuento},
  {vacio : '', concepto: 'Total', cost: totalx}
  ];
  
  }
  
  // se guarda la orden completa sin espacios
  await this.localstorage.setObject('itemOrder', itemsinvaciosOrderx)
  // se elimina los datos temporales de la orden
  await this.localstorage.removeData('itemcart')
  
    
  }
  

  }


 async cupon(){
    const modal = await this.modalCtrl.create({
      component: CuponComponent
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {
      this.loading.simpleLoader()
      var user =  JSON.parse(await this.localstorage.getData('usuario'))
         var idtoken = await this.localstorage.getData('idtoken')
         var autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')  
         var url1 = 'https://washtt.com/v1_api_clientes_aplicarcupon.php'
         var data1 = { idtoken: idtoken, autenticacion_tipo: autenticacion_tipo,  email: user.email , codigocupon : data.coupon }
         this.cHttps(url1, data1).subscribe(
           async (res: any) => {
            this.loading.dismissLoader()  
            let mensaje
            let header
            let code
            switch(res.data.respuesta) {
              case 'ERROR':
                code = '01'
                header = 'Error'
                mensaje = 'an error occurred,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])       
                this.aviso(header, mensaje, code)              
                break; 
                case 'TOKEN ERROR':
                  code = '01'
                  header = 'Error' 
                  mensaje = 'Invalid or expired token,please login again'
                  this.localstorage.clearData()
                  this.router.navigate(['/login'])   
                  this.aviso(header,mensaje,code)                       
                  break;
case 'CUPON_USADO':
  code = ''
  header = 'Waiting' 
  mensaje = res.data.mensaje  
  this.aviso(header,mensaje,code)     
break;

case 'CUPON_CADUCADO':
  code = ''
  header = 'Waiting' 
  mensaje = res.data.mensaje 
  this.aviso(header,mensaje,code)     
break;

case 'CUPON_NOACTIVO':
  code = ''
  header = 'Waiting' 
  mensaje = res.data.mensaje 
  this.aviso(header,mensaje,code)     
break;

case 'CUPON_NO_IDENTIFICADO':
  code = ''
  header = 'Waiting' 
  mensaje = res.data.mensaje 
  this.aviso(header,mensaje,code)     
break;

case 'OK':
  this.ocultarcupon = false 

  if(res.data.type == 1) { // cupon tipo valor
    var descuento = res.data.valor * -1
    }
    else {
      var descuento = res.data.valor * this.subtotal *-1 / 100
    }
    const formatter$ = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    let total = this.subtotal + descuento 
    let subtotal = formatter$.format(this.subtotal)
    let descuentx = formatter$.format(descuento)
    let totalx = formatter$.format(total)
    this.transactions = [
    {vacio : '', concepto: 'Subtotal', cost: subtotal },
    {vacio : '', concepto: 'Discount', cost: descuentx},
    {vacio : '', concepto: 'Total', cost: totalx}
    ]; 

    code = ''
    header = 'Congratulations' 
    mensaje = res.data.mensaje 
    this.aviso(header,mensaje,code)   

    var datoscupon = {type: res.data.type , valor: res.data.valor}
    await this.localstorage.setObject('datacupon', datoscupon);
   
break;
                  
                  

            }




           })



    }
  }

 



add() {
  this.router.navigate(['/tabs/tabtobooks/tipovehiculos']); 
}

async borrar(y:number) {
  
  this.itemOrdera = JSON.parse(await this.localstorage.getData('itemOrder'))



 
  this.itemOrdera.splice(y, 1 , 'Borrado');
 
 
 
var itemsinvaciosOrder = this.itemOrdera.filter(((itemOrdera: string | any[]) => itemOrdera !== 'Borrado'))

this.itemOrderCart = itemsinvaciosOrder


await this.localstorage.setObject('itemOrder', itemsinvaciosOrder)
 
   if(itemsinvaciosOrder.length  === 0) { // NO HAY ITEM Y CIERRA CARTn
  
     await this.localstorage.removeData('itemOrder')
     await this.localstorage.removeData('itemcart')
     await this.localstorage.removeData('datacupon')
      this.router.navigate(['/tabs/tabtobooks/tipovehiculos']);
   
}

else { 
  
  // ACTUALIZAMOS LA TABLA INFERIOR


  this.subtotal =  itemsinvaciosOrder.map((x: { costo: any; }) => x.costo).reduce((a: any, b: any) => (a + b))

  if(this.datacupon !== null) {
  if(this.datacupon.type == 0) {  
      var descuento = this.datacupon.valor * this.subtotal * -1 / 100      
      }
      else {     
      var descuento =  this.datacupon.valor * -1     
      }
    }    
  else {
    var descuento = 0
  }  

  const formatter$ = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

console.log('YYY' + this.subtotal)

  let subtotal = formatter$.format(this.subtotal)
  let descuentoA = formatter$.format(descuento)
  
    this.transactions = [
      {vacio : '', concepto: 'Subtotal', cost: subtotal },
      {vacio : '', concepto: 'Discount', cost: descuentoA},   
      
    ];


   
   
 
 }






}

cancelar() {

  this.localstorage.removeData('itemOrder').then(
 
 (value) => {
 
   this.localstorage.removeData('datacupon').then(
     (value) => {
 
       this.router.navigate(['/tabs/tabtobooks/tipovehiculos'])  
       console.log(value)
     },
     (error) => {
       console.log(error)
     }
   )
   console.log(value)
 
 },
 (error) => {
   console.log(error)
 }
  
 
 
  )
     
     
    
    
   
    
   }
   
   async checkout(){
    this.loading.simpleLoader()

    var user = JSON.parse(await this.localstorage.getData('usuario'))
  var idtoken = await this.localstorage.getData('idtoken')
  var autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')   
  var itemsOrder =  JSON.parse(await this.localstorage.getData('itemOrder'));
  var itemsinvaciosOrder = itemsOrder.filter(((itemOrder: string | any[]) => itemOrder !== 'Borrado'))
  var subtotal =  itemsinvaciosOrder.map((x: { costo: any; }) => x.costo).reduce((a: any, b: any) => (a + b)) 
  var descuentoOrder = JSON.parse(await this.localstorage.getData('datacupon'));
  console.log(descuentoOrder)
  console.log(subtotal)
  console.log(itemsinvaciosOrder)

  var url1 = 'https://washtt.com/v2_api_clientes_checkout.php'
  var data1 = { idtoken: idtoken, autenticacion_tipo: autenticacion_tipo,  email: user.email ,  itemsOrder : itemsinvaciosOrder , descuentoOrder : descuentoOrder , subtotal: subtotal , }
  this.cHttps(url1, data1).subscribe(
    async (res: any) => {
     this.loading.dismissLoader()  
     let mensaje
     let header
     let code
     switch(res.data.respuesta) {
      case 'ERROR':
            code = '01'
            header = 'Error'
            mensaje = 'an error occurred,please login again'
            this.localstorage.clearData()
            this.router.navigate(['/login'])       
            this.aviso(header, mensaje, code)              
            break;  
            case 'TOKEN ERROR':
              code = '01'
              header = 'Error' 
              mensaje = 'Invalid or expired token,please login again'
              this.localstorage.clearData()
              this.router.navigate(['/login'])   
              this.aviso(header,mensaje,code)                       
              break;   
              case 'NO ENVIADOS':

              await this.localstorage.removeData('itemOrder');
                await this.localstorage.removeData('datacupon');
                this.router.navigate(['/tabs/tabtobooks/mybooks']); 
                code = ''
                header = 'Waiting' 
                mensaje = "Reservation completed"
                this.aviso(header,mensaje,code) 
                break;
                case '200_OK':

                await this.localstorage.removeData('itemOrder');
                  await this.localstorage.removeData('datacupon');
        
                  this.router.navigate(['/tabs/tabtobooks/successtobook']);
              break;
              

     }
    
   })



   }  


   

}
