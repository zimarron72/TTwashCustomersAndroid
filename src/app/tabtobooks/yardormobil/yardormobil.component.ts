import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params } from '@angular/router';
import { Router } from '@angular/router';
import { StorageService } from '../../servicios/storage.service';
import {  ModalController, AlertController  } from '@ionic/angular';
import {CitamobilComponent} from '../citamobil/citamobil.component';
import {CitayardComponent} from '../citayard/citayard.component';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-yardormobil',
  templateUrl: './yardormobil.component.html',
  styleUrls: ['./yardormobil.component.scss'],
  standalone:false
})
export class YardormobilComponent  implements OnInit {
  user!:any
  washname! : string
  washlavado! : string
washvehiculo! : string 
  washid! : number;
  washprecio! : string
  washpreciomobil! : string
  precioyarda! :string
  preciomobils!:string
  idtoken!:any
  fleet!:any
autenticacion_tipo!:any
locations!:any
datacamion!:any


vehiculoid :any
diacita : any
horacita : any 
camionn : any
camiont : any
camionmdl : any
camionmar : any
camioncolor : any
camiondetalles : any
license : any


suite :any
street :any
address :any
zip :any
state :any
city :any
favorito :any



  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private localstorage: StorageService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    
  ) {

    this.washname = this.rutaActiva.snapshot.params['servicio'];
    this.washlavado = this.rutaActiva.snapshot.params['vehiculo'];
   this.washvehiculo = this.rutaActiva.snapshot.params['washvehiculo'];
   
  this.washid = this.rutaActiva.snapshot.params['washid']
  this.washprecio = this.rutaActiva.snapshot.params['washprecio']
  this.washpreciomobil = this.rutaActiva.snapshot.params['washpreciomobil']
    this.rutaActiva.params.subscribe(
      async (params: Params) => {
        this.washname = params['servicio'];
        this.washlavado = params['vehiculo'];
      this.washvehiculo = params['washvehiculo'];

        this.washid = params['washid']
        this.washprecio = params['washprecio']
        this.washpreciomobil = params['washpreciomobil']
      
        
      }
    );
   
     

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
    await this.localstorage.setData('vehiculo', this.washlavado)
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')

    if(this.user) {
     
      let precioyard = parseInt(this.washprecio) 
      let preciomobil = parseInt(this.washpreciomobil)
    this.precioyarda = formatter$.format(precioyard)
    this.preciomobils = formatter$.format(preciomobil)
      
    }
    else {
      let mensaje = 'please login again'
      let header = 'Warning'
      let code = ''
      this.localstorage.clearData()
      this.router.navigate(['/login']);
      this.aviso(header, mensaje, code) 
    }
  }

  async yarda(){
    const modal = await this.modalCtrl.create({
      component: CitayardComponent
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();

    if (role === 'continue') {

//Datos del vehiculo seleccionado

  let url1 = 'https://washtt.com/v1_api_clientes_getfleetcliente.php'
  let data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
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
      
        case 'TOKEN ERROR':
          code = ''
          header = 'Error'
          mensaje = 'Invalid or expired token,please login again'
          this.localstorage.clearData()
          this.router.navigate(['/login'])   
          this.aviso(header, mensaje, code) 
        break;   
      
        case '200_OK':
          console.log(res.data)
        
        this.fleet = Object.values(res.data)
        this.fleet =  this.fleet.filter(((valor: string | any[]) => valor !== '200_OK'))
        console.log('XMG :' + this.fleet)


 //Establecer dia y hora cita

 var diacita = data.diacita;
var date = new Date(diacita);
 var dia = date.getDate();
  var mesIndex = date.getMonth();
 var year = date.getFullYear();

 if(mesIndex >= 9) {
 diacita = (mesIndex+1)+'-'+dia+'-'+year;
 }
 else {
 diacita = '0'+(mesIndex+1)+'-'+dia+'-'+year;
 }


  for (let camiones of this.fleet) 
          {
          if(camiones.unit_number === data.numberv) {           

     var itemcart = {
        
        donde : 1,  
        sitioid: 0,
        vehiculoid : camiones.row_id_cat,
        diacita : diacita,
        horacita : data.horacita, 
        camionn : camiones.unit_number,
        camiont : camiones.type_vehicle,
        camionmdl : camiones.model,
        camionmar : camiones.mark,
        camioncolor : camiones.color,
        camiondetalles : camiones.appearance,
        license : camiones.license,
        servicio : this.washname,
        servicioid: this.washid,
        location : data.yard,
        price : parseFloat(this.washprecio).toFixed(2),
        costo : parseInt(this.washprecio)
        
      
      }   

      await this.localstorage.setObject('itemcart',itemcart)
             
          }
          }

         
        
          this.router.navigate(['/tabs/tabtobooks/cart/']);








        break;
      }  
    })









  }
  }

  async mobil(){
    const modal = await this.modalCtrl.create({
      component: CitamobilComponent
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();
    if (role === 'continue') {

      let url1 = 'https://washtt.com/v1_api_clientes_getfleetcliente.php'
      let data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
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
          
            case 'TOKEN ERROR':
              code = ''
              header = 'Error'
              mensaje = 'Invalid or expired token,please login again'
              this.localstorage.clearData()
              this.router.navigate(['/login'])   
              this.aviso(header, mensaje, code) 
            break;   
          
            case '200_OK':
              console.log(res.data)
            
            this.fleet = Object.values(res.data)
            this.fleet =  this.fleet.filter(((valor: string | any[]) => valor !== '200_OK'))
            console.log('XMG :' + this.fleet)
      
            for (let camiones of this.fleet) 
              {
              if(camiones.unit_number === data.numberv) {  
                this.vehiculoid = camiones.row_id_cat 
                this.camionn = camiones.unit_number
             this.camiont = camiones.type_vehicle
             this.camionmdl = camiones.model
             this.camionmar = camiones.mark
             this.camioncolor = camiones.color
             this.camiondetalles = camiones.appearance
             this.license = camiones.license           
              }      
            }
          
            break;
          }   
          
      //Establecer dia y hora cita

  var diacita = data.diacita;
  var date = new Date(diacita);
  var dia = date.getDate();
  var mesIndex = date.getMonth();
  var year = date.getFullYear();
 
 if(mesIndex >= 9) {
 diacita = (mesIndex+1)+'-'+dia+'-'+year;
 }
 else {
 diacita = '0'+(mesIndex+1)+'-'+dia+'-'+year;
 }
 
let itemcart = {
       
  donde : 2,  
  sitioid: data.location,
 suite: data.suite,
  street: data.street,
  address: data.address,
  zip: data.zip,
  state: data.state,
  city: data.city,
  favorito: data.favorito,
  power: data.power,
  water:  data.water,
  presencia: data.presencia,
  vehiculoid : this.vehiculoid,
  diacita : diacita,
  horacita : data.horacita, 
  camionn : this.camionn,
  camiont : this.camiont,
  camionmdl : this.camionmdl,
  camionmar : this.camionmar,
  camioncolor : this.camioncolor,
  camiondetalles : this.camiondetalles,
  license : this.license,
  servicio : this.washname,
  servicioid: this.washid,
  location : data.location,
  price : parseFloat(this.washpreciomobil).toFixed(2),
  costo : parseInt(this.washpreciomobil)   
} 
    
await this.localstorage.setObject('itemcart', itemcart) 
this.router.navigate(['/tabs/tabtobooks/cart/']);     

      
        }  ).closed

       

}


  }

  cancel() {
    this.router.navigate(['/tabs/tabtobooks/tipovehiculos']);
  }











}




