import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate de tener esta importación

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PasajeroPage } from './pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, // Añade 'FormsModule' aquí
    RouterModule.forChild([{ path: '', component: PasajeroPage }]),
  ],
  declarations: [PasajeroPage],
})
export class PasajeroPageModule {}

