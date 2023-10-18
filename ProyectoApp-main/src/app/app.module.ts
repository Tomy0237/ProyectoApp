import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { ViajesService } from 'src/viajes.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule,  IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideDatabase(() => getDatabase())],
  providers: [{ provide: RouteReuseStrategy,  useClass: IonicRouteStrategy },
  ViajesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
