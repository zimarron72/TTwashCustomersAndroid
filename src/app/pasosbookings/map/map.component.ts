import { Component, ElementRef, OnInit, ViewChild , AfterViewInit,} from '@angular/core';
import { GoogleMap , MapType, Marker} from '@capacitor/google-maps';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute,  Params } from '@angular/router';
import { StorageService } from '../../servicios/storage.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone:false
})
export class MapComponent  implements AfterViewInit {
  @ViewChild('map', { static: true }) mapRef!: ElementRef;
  googleMap!: GoogleMap;


lat!:any
lng!:any
direccion!:string
yard_nombre:any


  constructor(
    private toastController: ToastController,
     private router: Router,
      private rutaActiva: ActivatedRoute,
          private localstorage:StorageService, 
  ) {


       this.lat = this.rutaActiva.snapshot.params['lat'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.lat = params['lat'];    
      }
    );

   this.lng = this.rutaActiva.snapshot.params['lng'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.lng = params['lng'];    
      }
    );  

       this.direccion = this.rutaActiva.snapshot.params['direccion'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.direccion = params['direccion'];    
      }
    );  

           this.yard_nombre = this.rutaActiva.snapshot.params['yard_nombre'];
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.yard_nombre = params['yard_nombre'];    
      }
    );  



  }

  ngOnInit() {

  }
async ngAfterViewInit() {
    await this.createMap()
  }


  async createMap() {
    try {
      if (!this.mapRef || !this.mapRef.nativeElement) {
        throw new Error('El elemento del mapa no está disponible.');
      }


    this.lat =   parseFloat(this.lat);
  this.lng = parseFloat(this.lng);

      this.googleMap = await GoogleMap.create({
        id: 'mi-mapa',
        element: this.mapRef.nativeElement,
        apiKey: "AIzaSyDwXvxLDStykxb9WIKWmM2z2RfZFOpEocQ", // Asegúrate de que la clave sea correcta
        config: {
  center: {
          lat:  this.lat,
          lng:  this.lng,
        },
        zoom: 12,
     
        }
      

      });

      // Si se crea correctamente, puedes añadir un marcador
      await this.addMarker();
      
    } catch (e: any) {
      console.error('Error al crear el mapa:', e);
      this.showToast('Error al cargar el mapa. Por favor, inténtelo de nuevo.', 'danger');
      this.handleSpecificErrors(e);
    }
  }

  async addMarker() {



    if (!this.googleMap) {
      return;
    }
    const marker: Marker = {
      coordinate: {
        lat: this.lat,
        lng: this.lng,
      },
      title: this.direccion,
    };
    try {
     
  await this.googleMap.addMarker(marker);

    } catch (e) {
      console.error('Error al añadir el marcador:', e);
      this.showToast('Error al añadir el marcador.', 'warning');
    }
  }

  handleSpecificErrors(error: any) {
    if (error.message.includes('MissingKeyMapError') || error.message.includes('NoApiKeys')) {
      this.showToast('La clave de la API de Google Maps no es válida.', 'danger');
    }
    // Puedes añadir más lógica para otros tipos de errores
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 3000,
    });
    toast.present();
  }

atras() {
       this.router.navigate(['pasos/selectyarda'])       
}


 async selectCita(yard_nombre:any) {
   const itemcart = JSON.parse(await this.localstorage.getData('itemcart'))

  const newitemcart = {
    ...itemcart,
      donde : 1, //onsite
      sitioid : 0,
      yard_nombre : yard_nombre,
    }

 await this.localstorage.setObject('itemcart', newitemcart)
this.router.navigate(['/pasos/selectcita']);  
 }   
  
}
