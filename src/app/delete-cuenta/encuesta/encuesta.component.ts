import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { CapacitorHttp,  HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';
import { LoadingService } from '../../servicios/loading.services';
interface forma {
  id: string;
  name: string;

}


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
  standalone:false
})
export class EncuestaComponent  implements OnInit {
 formas: forma[] = [
    {
      id: 'excellent',
      name: 'Excellent',

    },
    {
      id: 'very good',
      name: 'Very Good',

    },
       {
      id: 'good',
      name: 'Good',

    },
     {
      id: 'regular',
      name: 'Regular',

    },
    {
      id: 'bad',
      name: 'Bad',

    },

  ];

  selectedOption: any

  opinion:any
  constructor(
  private router: Router,
      private alertController: AlertController,
      private loading: LoadingService,  
  ) { }

  ngOnInit() {}

   handleChange(event: Event): any {
    const target = event.target as HTMLInputElement;
    this.opinion = target.value
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

  async aviso(header : string,mensaje : string, code : string) {
if(code == '') {
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
   
  submit() {
 var url = 'https://app.washtt.com/470_clientes_save_encuenta.php'
    var data1 = {  opinion: this.opinion }
    this.cHttps(url, data1).subscribe(
      async (res: any) => {
    
        console.log(res)
        let mensaje
        let header
        let code
        switch (res.data.respuesta) {
          case 'ERROR':
            code = '01'
            header = 'Error'
            mensaje = 'Uupss.. an error occurred,forget this idea'            
            this.aviso(header, mensaje, code)              
            break;         
                   
          case 'OK':   
            code = ''
          header = '' 
          mensaje = 'Thank you for your opinion.'
         this.aviso(header,mensaje,code) 
          this.router.navigate(['login'])   
          break;  
        }
                      
      }
    )

  }  

}
