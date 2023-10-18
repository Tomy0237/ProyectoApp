import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ViajesService } from 'src/viajes.service';



@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage {
  data: any = {
    end: 'TuDestino',
    precio: 'TuPrecio',
    asientos: 'TusAsientos',
    hora: 'TuHora',
    telefono: 'TuTelefono',
    chofer: 'TuChofer',
  };
  

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private viajesService: ViajesService ) {this.data = this.viajesService.obtenerUltimoViaje();}


  volverPaginaAnterior() {
    this.navCtrl.back();
  }


}






