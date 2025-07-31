import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../servicios/storage.service';
import { LoadingService } from '../../servicios/loading.services'
import { AlertController,IonActionSheet  } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import type { OverlayEventDetail } from '@ionic/core';

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

  picture! : string
rostro: any = './assets/imgs/foto_perfil.svg'



  baseUrl: string = 'https://washtt.com'

  constructor(

 private router: Router,
    private localstorage: StorageService,
    private loading : LoadingService, 
    private alertController:AlertController

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
    this.rostro = res.data.rostro
   if(this.rostro == '' || this.rostro == null || this.rostro == undefined) {
this.rostro = './assets/imgs/foto_perfil.svg'
  }
  else {
    this.rostro = this.baseUrl+'/'+res.data.rostro
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


fromCamara() {

}

fromGallery() {}

cancel_password(){}

submit_password(){}

edit_password(){}





 doRefresh(event: { target: { complete: () => void; }; }) {
  event.target.complete();
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
  this.rostro = res.data.rostro
  if(this.rostro == '' || this.rostro == null || this.rostro == undefined) {
this.rostro = './assets/imgs/foto_perfil.svg'
  }
  else {
    this.rostro = this.baseUrl+'/'+res.data.rostro
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
  let mensaje
  let header
  let code  
  switch(this.datos.role) {

case 'camara':
  mensaje = '1'
  header = '1'
  code = '1'
  this.aviso(header, mensaje, code) 

  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });

  this.rostro = capturedPhoto.webPath
  return this.rostro

break; 

case 'galeria':
  mensaje = '2'
  header = '2'
  code = '2'
  this.aviso(header, mensaje, code) 
break;

case 'cancel':
  this.router.navigate(['/tabs/tabprofile/nav-profile'])   
break; 

  }
}


private async savePicture(photo: Photo) {
  // Convert photo to base64 format, required by Filesystem API to save
  const base64Data = await this.readAsBase64(photo);

  // Write the file to the data directory
  const fileName = Date.now() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data
  });

  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
  return {
    filepath: fileName,
    webviewPath: photo.webPath
  };
}

private async readAsBase64(photo: Photo) {
  // Fetch the photo, read as a blob, then convert to base64 format
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();

  return await this.convertBlobToBase64(blob) as string;
}

private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

}
