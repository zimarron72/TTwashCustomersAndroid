import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
@Component({
  selector: 'app-modaladdtruck',
  templateUrl: './modaladdtruck.component.html',
  styleUrls: ['./modaladdtruck.component.scss'],
  standalone:false
})
export class ModaladdtruckComponent  implements OnInit {
  tipov:any
  detallev:any
  tipos!: any;
  model!: string;
  brand!:string
  color!:number
  license!:string
  unitnumber!:string
  detalles!:any
  default:any
  idtoken!: any
  autenticacion_tipo!:any
 
  constructor(
    private modalCtrl: ModalController,
    private localstorage:StorageService, 
  ) { }

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

  async ionViewWillEnter() {
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')  
    var url2 = 'https://washtt.com/v1_api_clientes_formtipovehiculos.php'
    var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
    this.cHttps(url2, data2).subscribe(
      async (res: any) => {
        this.tipos = res.data; 
    this.tipos = Object.values(this.tipos)
   this.tipos =  this.tipos.filter(((valor: string | any[]) => valor !== 'OK_DATA'))
   console.log(this.tipos)
      }
      )
      var url1 = 'https://washtt.com/v1_api_clientes_formtipodetallesvehiculo.php'
      var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
      this.cHttps(url1, data1).subscribe(
        async (res: any) => {
          this.detalles = res.data
          this.detalles = Object.values(this.detalles)
          this.detalles =  this.detalles.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
           console.log(this.detalles)
          }
        )
  }







  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({
     vehicletypes : this.tipov,
       model : this.model,
       mark : this.brand,
      color : this.color,
      licenseplate:this.license,
      ciudad:this.unitnumber,
      detail:this.detallev,
      unitnumber:this.unitnumber,
      defaults:this.default
      },
       
       'confirm');
  }

}
