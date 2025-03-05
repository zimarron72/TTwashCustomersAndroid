import { Component, OnInit } from '@angular/core';
import {    ModalController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
@Component({
  selector: 'app-addsite',
  templateUrl: './addsite.component.html',
  styleUrls: ['./addsite.component.scss'],
  standalone:false
})
export class AddsiteComponent  implements OnInit {
  suite!: string;
  street!: string;
  address!:string
  zip!:number
  estado!:string
  ciudad!:string
  estados!:any
  idtoken!: any
  autenticacion_tipo!:any
  cities!:any
  default:any
  constructor(
    private localstorage:StorageService,
    private modalCtrl: ModalController,
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
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    var url2 = 'https://washtt.com/v1_api_clientes_formestados.php'
    var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
    this.cHttps(url2, data2).subscribe(
      async (res: any) => {
        this.estados =  res.data
        this.estados = Object.values(this.estados)
        this.estados =  this.estados.filter(((valor: string | any[]) => valor !== 'OK_DATA'))
        console.log(this.estados)
      })
      var url1 = 'https://washtt.com/v1_api_clientes_formciudades.php'
      var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
      this.cHttps(url1, data1).subscribe(
        async (res: any) => {
          this.cities = res.data
          this.cities = Object.values(this.cities)
          this.cities =  this.cities.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
           console.log(this.cities)
        })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  continue() {
    return this.modalCtrl.dismiss({
      suite : this.suite,
       street : this.street,
       address : this.address,
      zip : this.zip,
      estado:this.estado,
      ciudad:this.ciudad,
      defaults:this.default
      },
       
       'continue');
  }

}
