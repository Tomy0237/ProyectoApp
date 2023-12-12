import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ViajesService } from 'src/app/viajes.service';
declare var google: any;

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})


export class ConductorPage {
  formulario: FormGroup;
  viajes: any[] = [];
  precio: string = '';  
  asientos: string = '';
  hora: string = '';
  telefono: string = '';
  chofer: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private platform: Platform,
    private navCtrl: NavController,
    private alertController: AlertController,
    private viajesService: ViajesService
  ) {
    this.formulario = this.formBuilder.group({
      end: ['', Validators.required],
      precio: ['', [Validators.required, Validators.maxLength(5)]],
      asientos: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
      hora: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(9)]],
      chofer: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  @ViewChild('map') mapElement: ElementRef | undefined;
  public map: any;
  public start: any = 'Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile';
  public end: any = 'Pomaire';
  public directionsService: any;
  public directionsDisplay: any;
  public autocompleteItems: any;

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    let mapOptions = {
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      this.mapElement!.nativeElement,
      mapOptions
    );
    this.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: this.start,
        destination: this.end,
        travelMode: 'DRIVING',
      },
      (response: any, status: string) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  updateSearchResults() {
    let GoogleAutocomplete = new google.maps.places.AutocompleteService();
    if (this.end == '') {
      this.autocompleteItems = [];
      return;
    }
    GoogleAutocomplete!.getPlacePredictions(
      { input: this.end },
      (predictions: any, status: any) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction: any) => {
            this.autocompleteItems!.push(prediction);
          });
        });
      }
    );
  }

  selectSearchResult(item: any) {
    this.end = item.description;
    this.autocompleteItems = [];
    this.initMap();
  }

  submitForm() {
    if (this.formulario.valid) {
      const nuevoViaje = {
        end: this.end,
        precio: this.formulario.value.precio,
        asientos: this.formulario.value.asientos,
        hora: this.formulario.value.hora,
        telefono: this.formulario.value.telefono,
        chofer: this.formulario.value.chofer,
      };

      this.viajesService.agregarViaje(nuevoViaje);

      this.presentAlert();
    } else {
      this.presentValidationAlert();
    }
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

  async presentValidationAlert() {
    const alert = await this.alertController.create({
      header: 'Validación',
      message: 'Por favor, completa todos los campos correctamente.',
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
    
    this.viajes = this.viajesService.obtenerViajes();
  }

  volverPaginaAnterior() {
    this.navCtrl.back();
  }
}


