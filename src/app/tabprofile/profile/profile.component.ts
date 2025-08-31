import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../servicios/storage.service';
import { LoadingService } from '../../servicios/loading.services'
import { AlertController, IonActionSheet  } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import type { OverlayEventDetail } from '@ionic/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false
})
export class ProfileComponent  implements OnInit {


  public actionSheetButtons = [
    {
      text: 'camera',
      role: 'camara',
      data: {
        action: 'camara',
      },
    },
    {
      text: 'gallery',
      role: 'galeria',
      data: {
        action: 'galeria',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
    
  ];

 username:any
email:any
password:any
fullname:any
address:any
  user:any
  idtoken:any
  autenticacion_tipo:any
datos:any

rostro: any 



 

  constructor(

 private router: Router,
    private localstorage: StorageService,
    private loading : LoadingService, 
    private alertController:AlertController,
    

  ) { }

  ngOnInit() {}

  async ionViewWillEnter() {



    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')
    this.loading.simpleLoader()
    if(this.user) {
      let url = 'https://washtt.com/v1_api_clientes_getinfocuenta.php'
      let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
      this.cHttps(url, data).subscribe(
        async (res: any) => {
          this.loading.dismissLoader()  
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
  
            this.username = res.data.u_name
    this.email = res.data.email
    this.password = res.data.password
    this.fullname = res.data.fullname
    this.address = res.data.street
    this.rostro = res.data.imagenbase64
   
    if(res.data.imagenbase64 == '' || res.data.imagenbase64 == null || res.data.imagenbase64 == undefined) {
this.rostro = './assets/imgs/foto_perfil.svg'

  }
  else {
 
     this.rostro = "data:image/jpeg;base64,"+res.data.imagenbase64 

  }
            
  
  
            break;
          }  
        })
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









 doRefresh(event: { target: { complete: () => void; }; }) {
  event.target.complete();

  if(this.user) {
    let url = 'https://washtt.com/v1_api_clientes_getinfocuenta.php'
    let data = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
    this.cHttps(url, data).subscribe(
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

        this.username = res.data.u_name
    this.email = res.data.email
    this.password = res.data.password
    this.fullname = res.data.fullname
    this.address = res.data.street
   
    
   if(res.data.imagenbase64 == '' || res.data.imagenbase64 == null || res.data.imagenbase64 == undefined) {
this.rostro = './assets/imgs/foto_perfil.svg'

  }
  else {
 
     this.rostro = "data:image/jpeg;base64,"+res.data.imagenbase64 

  }
  
          


          break;
        }  
      })
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

 async logResult(event: CustomEvent<OverlayEventDetail>) {
  
  this.datos = event.detail

  switch(this.datos.role) {

case 'camara':
  
 const capturedCamera = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // or .DataUrl for base64
      source: CameraSource.Camera,
      quality: 90
    });

       let url1 = 'https://washtt.com/v1_api_clientes_rostro_base64.php'
      let data1 = { 
        idtoken: this.idtoken,
        autenticacion_tipo: this.autenticacion_tipo,
        email : this.user.email,
        imagenBase64 : capturedCamera.base64String
      }
      this.loading.simpleLoader()
      this.cHttps(url1, data1).subscribe(
        async (res: any) => {
  this.loading.dismissLoader()  
          let mensaje
          let header
          let code
          switch(res.data.success) {
         
            case false:
              code = ''
              header = 'Error'
              mensaje = 'an error occurred,please login again'
              this.localstorage.clearData()
              this.router.navigate(['/login']);
              this.aviso(header, mensaje, code) 
              
             
            break;
          
            
          
            case true:
  
            this.rostro = "data:image/jpeg;base64,"+capturedCamera.base64String; 
            
  
  
            break;
          }  
        })  

break; 

case 'galeria':
 
 const capturedGallery = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // or .DataUrl for base64
      source: CameraSource.Photos,
      quality: 90
    });

       let url2 = 'https://washtt.com/v1_api_clientes_rostro_base64.php'
      let data2 = { 
        idtoken: this.idtoken,
        autenticacion_tipo: this.autenticacion_tipo,
        email : this.user.email,
        imagenBase64 : capturedGallery.base64String
      }
      this.loading.simpleLoader()
      this.cHttps(url2, data2).subscribe(
        async (res: any) => {
  this.loading.dismissLoader()  
          let mensaje
          let header
          let code
          switch(res.data.success) {
         
            case false:
              code = ''
              header = 'Error'
              mensaje = 'an error occurred,please login again'
              this.localstorage.clearData()
              this.router.navigate(['/login']);
              this.aviso(header, mensaje, code) 
              
             
            break;
          
            
          
            case true:
  
            this.rostro = "data:image/jpeg;base64,"+capturedGallery.base64String; 
            
  
  
            break;
          }  
        })  
  
break;

case 'cancel':
  this.router.navigate(['/tabs/tabprofile/nav-profile'])   
break; 

  }
}


/*async BlobImage (imageUri: any )   {
 const fileName = Date.now() + '.jpeg';
  const blob = await fetch(imageUri).then(r => r.blob());
  const formData = new FormData();
  formData.append('image', blob, fileName); // 'myImage.jpeg' is the desired filename
  formData.append('email', this.user.email);
  formData.append('idtoken', this.idtoken);
  formData.append('autenticacion_tipo', this.autenticacion_tipo);
  return formData
}*/





}
