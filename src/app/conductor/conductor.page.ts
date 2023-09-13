import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage {
  nombre: string = '';
  destino: string = '';
  cupos: number = 1;
  precio: number = 0;
  telefono: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  submitForm() {
    
    this.nombre = '';
    this.destino = '';
    this.cupos = 1;
    this.precio = 0;
    this.telefono = '';

    
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Completado',
      message: 'Te contactaran en caso de que algun alumno quiera tomar tu recorrido, gracias.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
           
          },
        },
      ],
    });

    await alert.present();
  }

  volverPaginaAnterior() {
    this.navCtrl.back();
  }
}





