import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../servicios/storage.service';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import {  AlertController , ModalController} from '@ionic/angular';
import { Router, ActivatedRoute,  Params} from '@angular/router';
import { LoadingService } from '../../servicios/loading.services';
import { Location } from '@angular/common';
 





@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  standalone : false
})
export class CitasComponent  implements OnInit {

  n!: number
  vermensaje !: boolean
  vertabla! : boolean

  respuesta!: string
  verenlace1 : boolean = false 
  verenlace2 : boolean = false

  idtoken!: string
  autenticacion_tipo!: string
  token_notificacion!: string
  user: any

  conjunto:any

  constructor(
    private localstorage: StorageService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private loading: LoadingService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private location: Location,
  ) { 

    this.n = this.rutaActiva.snapshot.params['n'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.n = params['n'];    
      }
    );


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

  ngOnInit() {}

  async ionViewWillEnter() {

    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    this.loading.simpleLoader()
    var url = 'https://washtt.com/v2_api_clientes_getipoappointment.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, n : this.n }
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
            mensaje = 'Sorry, an error occurred,please login again2'
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
         
          
      default:

      var sinfiltrardatos = Object.values(res.data)
      this.conjunto = sinfiltrardatos

      if(sinfiltrardatos == null) {
        this.vertabla = false
        this.vermensaje = true
       
      }
      else {
        this.vertabla = true
        this.vermensaje = false
       
      }
         
        }
                      
      }
    )
  }


  async doRefresh(event: { target: { complete: () => void; }; }) {

    this.user = JSON.parse(await this.localstorage.getData('usuario'))
  if(this.user){   
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    this.loading.simpleLoader()
    var url = 'https://washtt.com/v2_api_clientes_getipoappointment.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email, n : this.n }
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
            mensaje = 'Sorry, an error occurred,please login again2'
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
         
          
      default:

      var sinfiltrardatos = Object.values(res.data)
      this.conjunto = sinfiltrardatos

      if(sinfiltrardatos == null) {
        this.vertabla = false
        this.vermensaje = true
       
      }
      else {
        this.vertabla = true
        this.vermensaje = false
       
      }
         
        }
                      
      }
    )
  }
  else {
    let mensaje = 'please login again'
    let header = 'Warning'
    let code = ''
    this.loading.dismissLoader() 
    this.localstorage.clearData()
    this.router.navigate(['/login']);
    this.aviso(header, mensaje, code) 
   } 
}

goBack(): void {
  this.location.back();
}

/*Cancelar(id: number): void {
 

  this.dialogo.open(DialogoconfirComponent, {
    data: `Are you sure to cancel this appointment? ?`
  }).afterClosed().subscribe(async (confirmado: Boolean) => {
    if (confirmado) {

      var user = JSON.parse(await this.localstorage.getData('usuario'))
      var idtoken = await this.localstorage.getData('idtoken')
       var autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
this.loading.simpleLoader()
this.serviciotobook.CancelarItemOrder(idtoken,autenticacion_tipo,id,user.email).subscribe({

next: async datos => {
this.loading.dismissLoader() 
switch(datos.respuesta) {

  case 'TOKEN ERROR':
    this.router.navigate(['/login']);
    this.snackBar.open("Invalid or expired token,please login again", "Close",
    {       
      horizontalPosition: "start",
      verticalPosition: "top",
    }
    );
  
  break;        
 case 'ERROR':
// borramos la informacion local
this.localstorage.clearData()
this.router.navigate(['/login']);

this.snackBar.open("Sorry, an error occurred,please login again6", "Close",
{       
horizontalPosition: "start",
verticalPosition: "top",
}
);    

break;

case 'MISMODIA':
  this.snackBar.open(datos.mensaje, "Close",
      {       
        horizontalPosition: "start",
        verticalPosition: "top",
      }
      ); 

break;   

case 'DIASDESPUESCITA':
  this.snackBar.open(datos.mensaje, "Close",
      {       
        horizontalPosition: "start",
        verticalPosition: "top",
      }
      ); 

break;   


case 'FALTAUNDIA':
  this.snackBar.open(datos.mensaje, "Close",
      {       
        horizontalPosition: "start",
        verticalPosition: "top",
      }
      ); 

break; 


  case '200_OK':
    this.snackBar.open('Appointment successfully cancelled', "Continue",
        {       
          horizontalPosition: "start",
          verticalPosition: "top",
        }
        ); 
        this.doRefresh(null);
            
      

  break;   
  
  }  
},
error: error => {   
this.loading.dismissLoader()   
  this.snackBar.open('The appointment has not been cancelled ', "Close",
  {       
    horizontalPosition: "start",
    verticalPosition: "top",
  }
  );    
console.error('There was an error!', error);
}





})
   
    } 
    
    else {
    
    }
  }); 

  



  }

  Borrar(id: number): void {
 

    this.dialogo.open(DialogoconfirComponent, {
      data: `Be sure to permanently delete this record?`
    }).afterClosed().subscribe(async (confirmado: Boolean) => {
      if (confirmado) {
  
       
        var idtoken = await this.localstorage.getData('idtoken')
         var autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
  this.loading.simpleLoader()
  this.serviciotobook.deleteItemOrder(idtoken,autenticacion_tipo,id).subscribe({
  next: async datos => {
   this.loading.dismissLoader() 
  switch(datos.respuesta) {
  
    case 'TOKEN ERROR':
      this.router.navigate(['/login']);
      this.snackBar.open("Invalid or expired token,please login again", "Close",
      {       
        horizontalPosition: "start",
        verticalPosition: "top",
      }
      );
    
    break;        
   case 'ERROR':
  // borramos la informacion local
  this.localstorage.clearData()
  this.router.navigate(['/login']);
  
  this.snackBar.open("Sorry, an error occurred,please login again6", "Close",
  {       
  horizontalPosition: "start",
  verticalPosition: "top",
  }
  );    
  
  break;
  
  
    case '200_OK':
      
     
          this.snackBar.open('The record has been deleted', "Continue",
          {       
            horizontalPosition: "start",
            verticalPosition: "top",
          }
          );
          this.doRefresh(null);     
      
        
      
    
  
  
  
  
    break;
    
   
    
    
    
    }  
  },
  error: error => {     
     this.loading.dismissLoader()     
  console.error('There was an error!', error);
  // borramos la informacion local
  this.localstorage.clearData()
  this.router.navigate(['/login']);
  
  this.snackBar.open("Sorry, an error occurred,please login again6", "Close",
  {       
  horizontalPosition: "start",
  verticalPosition: "top",
  }
  );  
  }
  
  
  
  
  
  })
      
      } 
      
      else {
      
      }
    }); 
  
    
  
  
  
    }  */

}
