import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.page.html',
  styleUrls: ['./billetera.page.scss'],
})
export class BilleteraPage implements OnInit {
  fechaVencimiento: string= ""; // Propiedad para la fecha de vencimiento
  nombreTarjeta: string= ""; // Propiedad para la fecha de vencimiento
  numeroTarjeta: string= ""; // Propiedad para la fecha de vencimiento
  cvv: number = 0; //
  
  constructor(private navCtrl: NavController) {}

  
  ngOnInit() {
  }
  volverPaginaAnterior() {
    this.navCtrl.back();
  }


  iniciarNavegacion() {
    this.navCtrl.navigateForward('/pago');
  }

}
