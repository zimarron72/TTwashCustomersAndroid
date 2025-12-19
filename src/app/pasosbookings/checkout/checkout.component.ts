import { Component, OnInit } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { LoadingService } from '../../servicios/loading.services';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false
})
export class CheckoutComponent implements OnInit {
  user: any
  idtoken: any
  autenticacion_tipo: any
  vehiculo: any
  servicio: any
  tipo: any
  precio: any
  time: any
  onsite: any
  mobil: any
  locationmobil: any
  locationonsite: any
  enproceso:boolean = true
  noprocesar: boolean = false
  mensaje: any;

  constructor(
    private localstorage: StorageService,
    private alertController: AlertController,
    private router: Router,
    private modalCtrl: ModalController,
    private loading: LoadingService,
  ) {

 this.enproceso = false
      this.noprocesar = false
this.mensaje=''
  }



  async ionViewWillEnter() {
    let vehiculoData = JSON.parse(await this.localstorage.getData('itemcartVehiculo1'))
    let servicioData = JSON.parse(await this.localstorage.getData('itemcartServicio'))
    let onsiteData = JSON.parse(await this.localstorage.getData('itemcartOnsite'))
    let mobilData = JSON.parse(await this.localstorage.getData('itemcartMobil'))
    let timeData = JSON.parse(await this.localstorage.getData('itemcartTime'))

    this.vehiculo = vehiculoData.camiont + " " + vehiculoData.camionmdl + " NUMBER: " + vehiculoData.camionn

    this.servicio = servicioData.servicio

    this.precio = servicioData.precio

    this.onsite = onsiteData.donde
    this.mobil = mobilData.donde

    if (this.onsite == 'nada') {
      this.locationmobil = 'AT YOUR ADDRESS: ' + mobilData.address + " " + mobilData.city + " " + mobilData.zip
    }
    if (this.mobil == 'nada') {
      this.locationonsite = 'AT OUR LOCATION: ' + onsiteData.address
    }

    this.time = timeData.diacita + " " + timeData.horacita


  }

  async aviso(header: string, mensaje: string, code: string) {
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

  ngOnInit() { }



  async notCoupon() {

    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    var itemcartVehiculo1 = JSON.parse(await this.localstorage.getData("itemcartVehiculo1"))
    var itemcartServicio = JSON.parse(await this.localstorage.getData("itemcartServicio"))
    var itemcartMobil = JSON.parse(await this.localstorage.getData("itemcartMobil"))
    var itemcartOnsite = JSON.parse(await this.localstorage.getData("itemcartOnsite"))
    var itemcartTime = JSON.parse(await this.localstorage.getData("itemcartTime"))

    const modal = await this.modalCtrl.create({
      component: CartComponent,
      componentProps: {
        respuesta: "no"
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirmado') {
      this.enproceso = true
      this.noprocesar = false
      var url1 = 'https://washtt.com/v2_api_clientes_checkout_unSoloVehiculo.php'
      var data1 = {

        idtoken: this.idtoken,
        autenticacion_tipo: this.autenticacion_tipo,
        email: this.user.email,
        dataVehiculo: itemcartVehiculo1,
        dataServicio: itemcartServicio,
        dataMobil: itemcartMobil,
        dataOnsite: itemcartOnsite,
        dataTime: itemcartTime,
        subtotalCifra: data.subtotalCifra,
        discountCifra: data.discountCifra,
        totalCifra: data.totalCifra,
        cuponid: data.cuponid

      }
      this.cHttps(url1, data1).subscribe(
        async (res: any) => {
         
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

               case 'NOPROCESAR':
               this.enproceso = true
      this.noprocesar = true
      this.mensaje = res.data.mensaje
              break;



            case '200_OK':
              this.router.navigate(['/tabs/tabtobooks/successtobook']);
              break;

          }

        }
      )

    }


  }

  async yesCoupon() {

    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    var itemcartVehiculo1 = JSON.parse(await this.localstorage.getData("itemcartVehiculo1"))
    var itemcartServicio = JSON.parse(await this.localstorage.getData("itemcartServicio"))
    var itemcartMobil = JSON.parse(await this.localstorage.getData("itemcartMobil"))
    var itemcartOnsite = JSON.parse(await this.localstorage.getData("itemcartOnsite"))
    var itemcartTime = JSON.parse(await this.localstorage.getData("itemcartTime"))

    const modal = await this.modalCtrl.create({
      component: CartComponent,
      componentProps: {
        respuesta: "si"
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirmado') {
     this.enproceso = true
      this.noprocesar = false
      var url1 = 'https://washtt.com/v2_api_clientes_checkout_unSoloVehiculo.php'
      var data1 = {

        idtoken: this.idtoken,
        autenticacion_tipo: this.autenticacion_tipo,
        email: this.user.email,
        dataVehiculo: itemcartVehiculo1,
        dataServicio: itemcartServicio,
        dataMobil: itemcartMobil,
        dataOnsite: itemcartOnsite,
        dataTime: itemcartTime,
        subtotalCifra: data.subtotalCifra,
        discountCifra: data.discountCifra,
        totalCifra: data.totalCifra,
        cuponid: data.cuponid

      }
      this.cHttps(url1, data1).subscribe(
        async (res: any) => {
       
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

             case 'NOPROCESAR':
               this.enproceso = true
      this.noprocesar = true
      this.mensaje = res.data.mensaje
              break;  

            default:
              this.router.navigate(['/tabs/tabtobooks/successtobook']);

          }

        }
      )

    }
  }





  async atras() {
    await this.localstorage.removeData('itemcartTime')
    this.router.navigate(['/pasos/selectcita']);
  }

}
