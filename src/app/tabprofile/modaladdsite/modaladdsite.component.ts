import { Component, OnInit } from '@angular/core';
import {  ModalController, AlertController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { StorageService } from '../../servicios/storage.service';
//import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modaladdsite',
  templateUrl: './modaladdsite.component.html',
  styleUrls: ['./modaladdsite.component.scss'],
  standalone:false
})
export class ModaladdsiteComponent  implements OnInit {
  suite!: string;
  street!: string;
  address!:string
  zip!:any
  estado!:string
  ciudad!:string
  estados!:any
  idtoken!: any
  autenticacion_tipo!:any
  cities!:any
  default:any


  constructor(private modalCtrl: ModalController,
    private localstorage:StorageService,
  // private formBuilder: FormBuilder,
    private alertController: AlertController,
  ) {
   
  

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





  async ngOnInit() {
   
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

  confirm() {



      this.modalCtrl.dismiss({
        suite : this.suite,
         street : this.street,
         address : this.address,
        zip : this.zip,
        estado:this.estado,
        ciudad:this.ciudad,
        defaults:this.default
        },'confirm') 


  }






}
