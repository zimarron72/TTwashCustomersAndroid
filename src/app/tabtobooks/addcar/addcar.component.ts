import { Component, OnInit } from '@angular/core';
import {   ModalController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.scss'],
  standalone:false
})
export class AddcarComponent  implements OnInit {

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
  vehiculo:any
  vehiculoid:any

  constructor(
    private modalCtrl: ModalController,
    private localstorage:StorageService, 
  ) { }

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

  async ionViewWillEnter() {
    this.vehiculo=await this.localstorage.getData('vehiculo')
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')  


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

  async continue() {
    return this.modalCtrl.dismiss({
      
      vehicletypes : await this.localstorage.getData('vehiculoid'),
      model : this.model,
      mark : this.brand,
     color : this.color,
     licenseplate:this.license,
     detail:this.detallev,
     unitnumber:this.unitnumber,
     defaults:this.default
      },
       
       'continue');
  }


}
