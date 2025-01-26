import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../servicios/storage.service';
import { LoadingService } from '../../servicios/loading.services';
import { AlertController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';


@Component({
  selector: 'app-billaddress',
  templateUrl: './billaddress.component.html',
  styleUrls: ['./billaddress.component.scss'],
  standalone : false
})
export class BilladdressComponent  implements OnInit {
  customertypes = [

    {valor:	''		, etiqueta:	'Select'	},

    {valor:	1		, etiqueta:	'Person'	},
  
    {valor:	2		, etiqueta:	'Company or fleet'	}
  
  ]

mobilx = ''
telefonox = ''
taxid = ''

  apellido! : string
  nombre! : string
  fullname! : string
  tipocliente! : string
  empresa! : string
  rif! : string
  casa! : string
  calle! : string
  direccion! : string
  codigopostal! : number
  estado! : string
  ciudad! : string  
  telefono! : string
  celular! : string
  ver : boolean = false

  xnombre : boolean = true
  xfnombre : boolean = false

  xapellido : boolean = true
  xfapellido : boolean = false

  xfullname : boolean = true
  xffullname : boolean = false

  xcustomer : boolean = true
  xfcustomer : boolean = false

  xempresa : boolean = true
  xfempresa : boolean = false

  xrif : boolean = true
  xfrif : boolean = false

  xcasa : boolean = true
  xfcasa : boolean = false

  xcalle : boolean = true
  xfcalle : boolean = false

  xdireccion : boolean = true
  xfdireccion : boolean = false

  xzip : boolean = true
  xfzip : boolean = false

  xestado : boolean = true
  xfestado : boolean = false

  xciudad : boolean = true
  xfciudad : boolean = false

  xtelefono : boolean = true
  xftelefono : boolean = false

  xcelular : boolean = true
  xfcelular : boolean = false

  form_firtname!: FormGroup;
  form_lastname!: FormGroup;
  form_fullname!: FormGroup;
  form_customer!: FormGroup;
  form_empresa!: FormGroup;
  form_rif!: FormGroup;
  form_suite!: FormGroup;
  form_calle!: FormGroup;
  form_direccion!: FormGroup;
  form_zip!: FormGroup;
  form_state!: FormGroup;
  form_city!: FormGroup;
  form_phone!: FormGroup;
  form_mobilphone!: FormGroup;

estados : any
cities : any

user: any
idtoken!: string
autenticacion_tipo!: string


 constructor(
    private alertController: AlertController,
    private router: Router,
    private formBuilder: FormBuilder,
    private localstorage:StorageService,
    private loading:LoadingService
  ) {

  

   }

  async ngOnInit() {
    this.reactiveForm(); 
  
  }

  async ionViewWillEnter() {  
    this.user = JSON.parse(await this.localstorage.getData('usuario'))
    this.idtoken = await this.localstorage.getData('idtoken')
    this.autenticacion_tipo = await this.localstorage.getData('autenticacion_tipo')


    this.loading.simpleLoader()
    if(this.user) {
        /********************************************************* */
        var url1 = 'https://washtt.com/v1_api_clientes_formciudades.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
        this.cHttps(url1, data1).subscribe(
          async (res: any) => {
            this.cities = res.data
            this.cities = Object.values(this.cities)
            this.cities =  this.cities.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
             console.log(this.cities)
          })
    /***************************************************************** */
    
    var url2 = 'https://washtt.com/v1_api_clientes_formestados.php'
    var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
    this.cHttps(url2, data2).subscribe(
      async (res: any) => {
        this.estados =  res.data
        this.estados = Object.values(this.estados)
        this.estados =  this.estados.filter(((valor: string | any[]) => valor !== 'OK_DATA'))
      })
    /*************************************************************************** */
    
    var url3 = 'https://washtt.com/v1_api_clientes_getinfobill.php'
    var data3 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
    this.cHttps(url3, data3).subscribe(
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
          
    
         this.apellido = res.data.l_name
         this.nombre =res.data.f_name
    
         var tipo = res.data.client_type
         switch(tipo){
           case '1':
            this.tipocliente = 'Person'
            this.ver = false
           break;
           case '2':
             this.tipocliente = 'Company or fleet'
             this.ver = true
           break;   
         }
         this.empresa = res.data.firma_name
         this.rif = res.data.firma_code
         this.casa = res.data.home
         this.calle = res.data.street_nr
         this.direccion = res.data.street
         this.codigopostal = res.data.zip
         this.estado = res.data.state
         this.ciudad = res.data.city 
         this.telefono = res.data.phone
         this.celular = res.data.mobil_phone
         this.fullname = res.data.fullname
    
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

  reactiveForm() {
  
    this.form_firtname = this.formBuilder.group({
      firstname: [, { validators: [Validators.required]}],      
    });

    this.form_lastname = this.formBuilder.group({
      lastname: [, { validators: [Validators.required]}],      
    });

  this.form_fullname = this.formBuilder.group({
      fullname: [, { validators: [Validators.required]}],      
    });

  this.form_customer = this.formBuilder.group({
      customer: [, { validators: [Validators.required]}],      
    }); 
    
    this.form_empresa = this.formBuilder.group({
      empresa: [, { validators: [Validators.required]}],      
    });

    this.form_rif = this.formBuilder.group({
      rif: [, { validators: [Validators.required]}],      
    });

    this.form_suite = this.formBuilder.group({
      casa: [, { validators: [Validators.required]}],      
    });

    this.form_calle = this.formBuilder.group({
      calle: [, { validators: [Validators.required]}],      
    });

    this.form_direccion = this.formBuilder.group({
      direccion: [, { validators: [Validators.required]}],      
    });

    this.form_zip = this.formBuilder.group({
      zip: [, { validators: [Validators.required]}],      
    });

    this.form_state = this.formBuilder.group({
      estado: [, { validators: [Validators.required]}],      
    });

    this.form_city = this.formBuilder.group({
      ciudad: [, { validators: [Validators.required]}],      
    });

    this.form_phone = this.formBuilder.group({
      phone: [, { validators: [Validators.required]}],      
    });

    this.form_mobilphone = this.formBuilder.group({
      mobil: [, { validators: [Validators.required]}],      
    });

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


 
  /**********************REFRESH********************************* */

  doRefresh(event: { target: { complete: () => void; }; }) {
    event.target.complete();
    this.loading.simpleLoader()
if(this.user) {
    /********************************************************* */
    var url1 = 'https://washtt.com/v1_api_clientes_formciudades.php'
    var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
    this.cHttps(url1, data1).subscribe(
      async (res: any) => {
        this.cities = res.data
        this.cities = Object.values(this.cities)
        this.cities =  this.cities.filter(((valor: string | any[]) => valor !== 'OK_DATA'))     
         console.log(this.cities)
      })
/***************************************************************** */

var url2 = 'https://washtt.com/v1_api_clientes_formestados.php'
var data2 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo}
this.cHttps(url2, data2).subscribe(
  async (res: any) => {
    this.estados =  res.data
    this.estados = Object.values(this.estados)
    this.estados =  this.estados.filter(((valor: string | any[]) => valor !== 'OK_DATA'))
  })
/*************************************************************************** */

var url3 = 'https://washtt.com/v1_api_clientes_getinfobill.php'
var data3 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email : this.user.email}
this.cHttps(url3, data3).subscribe(
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
      

     this.apellido = res.data.l_name
     this.nombre =res.data.f_name

     var tipo = res.data.client_type
     switch(tipo){
       case '1':
        this.tipocliente = 'Person'
        this.ver = false
       break;
       case '2':
         this.tipocliente = 'Company or fleet'
         this.ver = true
       break;   
     }
     this.empresa = res.data.firma_name
     this.rif = res.data.firma_code
     this.casa = res.data.home
     this.calle = res.data.street_nr
     this.direccion = res.data.street
     this.codigopostal = res.data.zip
     this.estado = res.data.state
     this.ciudad = res.data.city 
     this.telefono = res.data.phone
     this.celular = res.data.mobil_phone
     this.fullname = res.data.fullname

break;
    } 
  })
}
else {

  let mensaje = 'please login again'
  let header = 'Warning123'
  let code = ''
  this.loading.dismissLoader() 
  this.localstorage.clearData()
  this.router.navigate(['/login']);
  this.aviso(header, mensaje, code) 
}

  }
    
    /***************FUNCTIONS UPDATE***************************** */

    update_firstname() {

      if (this.form_firtname.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_firtname.get("firstname")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'nombre',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.nombre = variable
                this.xnombre = true
              this.xfnombre = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })      
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }


  }
   
    update_lastname() {
  
      if (this.form_lastname.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_lastname.get("lastname")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'apellido',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.apellido = variable
                this.xapellido = true
              this.xfapellido = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
      
      
    }
  
   update_fullname() {
  
      if (this.form_fullname.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_fullname.get("fullname")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'fullname',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.fullname = variable
                this.xfullname = true
              this.xffullname = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
  update_customer() {
  
      if (this.form_customer.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_customer.get("customer")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'customer',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                
                this.xcustomer = true
              this.xfcustomer = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
   update_empresa() {
  
      if (this.form_empresa.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_empresa.get("empresa")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'empresa',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.empresa = variable
                this.xempresa = true
              this.xfempresa = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
 update_rif() {
  
      if (this.form_rif.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_rif.get("rif")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'rif',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.rif = variable
                this.xrif = true
              this.xfrif = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
update_casa() {
  
      if (this.form_suite.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_suite.get("casa")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'casa',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.casa = variable
                this.xcasa = true
              this.xfcasa = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
update_calle() {
  
      if (this.form_calle.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_calle.get("calle")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'calle',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.calle = variable
                this.xcalle = true
              this.xfcalle = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
update_direccion() {
  
      if (this.form_direccion.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_direccion.get("casa")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'direccion',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.direccion = variable
                this.xdireccion = true
              this.xfdireccion = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
  update_zip() {
  
      if (this.form_zip.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_zip.get("casa")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'zip',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.codigopostal = variable
                this.xzip = true
              this.xfzip = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
  update_estado() {
  
      if (this.form_state.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_state.get("estado")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'estado',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.estado = variable
                this.xestado = true
              this.xfestado = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
update_ciudad() {
  
      if (this.form_city.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_city.get("ciudad")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'ciudad',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.ciudad = variable
                this.xciudad = true
              this.xfciudad = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
 update_telefono() {
  
      if (this.form_phone.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_phone.get("phone")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'telefono',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.telefono = variable
                this.xtelefono = true
              this.xftelefono = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
  
 update_celular() {
  
      if (this.form_mobilphone.valid) {
    
        this.loading.simpleLoader()
        let variable = this.form_mobilphone.get("mobil")?.value;
        var url = 'https://washtt.com/v1_api_clientes_editinfobill.php'
        var data1 = { idtoken: this.idtoken, autenticacion_tipo: this.autenticacion_tipo, email: this.user.email,
          campo : 'celular',
          valor : variable
        }
        this.cHttps(url, data1).subscribe(
          async (res: any) => {
            this.loading.dismissLoader()
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
              case 'TOKEN ERROR':
                code = '02'
                header = 'Error'
                mensaje = 'Invalid or expired token,please login again'
                this.localstorage.clearData()
                this.router.navigate(['/login'])  
                this.aviso(header, mensaje, code)   
              break;
             
              case 'OK_TODO':
                this.celular = variable
                this.xcelular = true
              this.xfcelular = false
              code = ''
              header = 'Notice'
              mensaje = 'The data was updated successfully'
              this.aviso(header, mensaje, code)   
              break;   

            }




      })
    }
    else {
      let mensaje = 'this information is required'
      let header = 'Warning'
      let code = ''
      this.aviso(header, mensaje, code)  
    }
      
    }
 /***************************************FUNCIONS EDIT */

 edit_firstname() {
  this.xnombre = false
  this.xfnombre = true
}

edit_lastname() {
  this.xapellido = false
  this.xfapellido = true
}

edit_fullname() {
  this.xfullname = false
  this.xffullname = true
}

edit_customer() {
  this.xcustomer = false
  this.xfcustomer = true
}

edit_empresa() {
  this.xempresa = false
  this.xfempresa = true
}

edit_rif() {
  this.xrif = false
  this.xfrif = true
}

edit_casa() {
  this.xcasa = false
  this.xfcasa = true
}

edit_calle() {
  this.xcalle = false
  this.xfcalle = true
}

edit_direccion() {
  this.xdireccion = false
  this.xfdireccion = true
}

edit_zip() {
  this.xzip = false
  this.xfzip = true
}

edit_estado() {
  this.xestado = false
  this.xfestado = true
}

edit_ciudad() {
  this.xciudad = false
  this.xfciudad = true
}

edit_telefono() {
  this.xtelefono = false
  this.xftelefono = true
}

edit_celular() {
  this.xcelular = false
  this.xfcelular = true
}  

/************************************FUNCTIONS EDIT */

cancel_firstname() {
  this.xnombre = true
  this.xfnombre = false
}


cancel_lastname() {
  this.xapellido = true
  this.xfapellido = false
}

cancel_fullname() {
  this.xfullname = true
  this.xffullname = false
}


cancel_customer() {
  this.xcustomer = true
  this.xfcustomer = false
}

cancel_empresa() {
  this.xempresa = true
  this.xfempresa = false
}

cancel_rif() {
  this.xrif = true
  this.xfrif = false
}

cancel_casa() {
  this.xcasa = true
  this.xfcasa = false
}

cancel_calle() {
  this.xcalle = true
  this.xfcalle = false
}

cancel_direccion() {
  this.xdireccion = true
  this.xfdireccion = false
}

cancel_zip() {
  this.xzip = true
  this.xfzip = false
}

cancel_estado() {
  this.xestado = true
  this.xfestado = false
}

cancel_ciudad() {
  this.xciudad = true
  this.xfciudad = false
}

cancel_telefono() {
  this.xtelefono = true
  this.xftelefono = false
}

cancel_celular() {
  this.xcelular = true
  this.xfcelular = false
}

/********************************************* */
    phoneFormat(event:any) {//returns (###) ###-####
      var input = event.target.value.replace(/\D/g,'').substring(0,10); //Strip everything but 1st 10 digits
      var size = input.length;
      if (size>0) {input="("+input}
      if (size>3) {input=input.slice(0,4)+") "+input.slice(4)}
      if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
      this.telefonox = input;
  }
  
  mobilFormat(event:any) {//returns (###) ###-####
    var input = event.target.value.replace(/\D/g,'').substring(0,10); //Strip everything but 1st 10 digits
    var size = input.length;
    if (size>0) {input="("+input}
    if (size>3) {input=input.slice(0,4)+") "+input.slice(4)}
    if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
    this.mobilx = input;
  }
  
  
  taxidFormat(event:any) {//returns (###) ###-####
    var input = event.target.value.replace(/\D/g,'').substring(0,10); //Strip everything but 1st 10 digits
    var size = input.length;
  
    if (size>2) {input=input.slice(0,3)+"- "+input.slice(3)}
    if (size>5) {input=input.slice(0,8)+"-" +input.slice(8)}
    this.taxid= input;
  }









}
