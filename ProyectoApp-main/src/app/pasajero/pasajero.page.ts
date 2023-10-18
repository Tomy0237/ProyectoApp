import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ViajesService } from 'src/viajes.service';
import { AlertController } from '@ionic/angular'; 
declare var google: any;

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage {
  precio: string = '';
  asientos: string = '';
  hora: string = '';
  telefono: string = '';
  chofer: string = '';

  viajes: any[] = [];
  latitude: any;
  longitude: any;
  public map: any;
  public start: string = "Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile";
  public end: string = "Pomaire";
  public directionsService: any;
  public directionsDisplay: any;
  public autocompleteItems: any;

  constructor(
    private viajesService: ViajesService,
    private platform: Platform,
    private navCtrl: NavController,
    private zone: NgZone,
    private alertController: AlertController
  ) {
  }

  @ViewChild('map') mapElement: ElementRef | undefined;

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    let latLng = new google.maps.LatLng(this.latitude, this.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement!.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response: any, status: string) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  updateSearchResults() {
    let GoogleAutocomplete = new google.maps.places.AutocompleteService();
    if (this.end == '') {
      this.autocompleteItems = [];
      return;
    }
    GoogleAutocomplete!.getPlacePredictions({ input: this.end },
      (predictions: any, status: any) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction: any) => {
            this.autocompleteItems!.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item: any) {
    this.end = item.description;
    this.autocompleteItems = [];
    this.initMap();
  }

  volverPaginaAnterior() {
    this.navCtrl.back();
  }

  submitForm() {
    const nuevoViaje = {
      end: this.end,
      precio: this.precio,
      asientos: this.asientos,
      hora: this.hora,
      telefono: this.telefono,
      chofer: this.chofer,
    };
  
    this.viajesService.agregarViaje(nuevoViaje);
  
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Completado',
      message: 'Tu viaje ha comenzado.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  ionViewWillEnter() {
    // Obtener la lista de viajes disponibles del servicio
    this.viajes = this.viajesService.obtenerViajes();
  }
}




 

  // contactarConductor(telefono: string) {
  //   // Aquí puedes implementar la lógica para contactar al conductor
  //   // Puedes abrir una aplicación de llamadas o enviar un mensaje, por ejemplo
  //   console.log('Contactando al conductor con el teléfono:', telefono);
  // }


// // pasajero.page.ts



  
//   // Resto del código



//   // Resto del código
// }



