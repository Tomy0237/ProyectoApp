import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, public alertController: AlertController) {}

  iniciarSesion() {
    // Utiliza una expresión regular para validar la entrada del usuario
    const usuarioValido = /^[^@]+@duocuc\.cl$/.test(this.usuario);
  
    if (usuarioValido && this.contrasena.trim() !== '') {
      // Navega a la página de inicio
      this.router.navigate(['/home']);
  
      // Restablece los campos de entrada
      this.usuario = '';
      this.contrasena = '';
    } else {
      this.mostrarVentanaEmergente();
    }
  }


    async mostrarVentanaEmergente() {
      const alert = await this.alertController.create({
        header: 'Error de inicio de sesión',
        message: 'El correo o la contraseña son incorrectos. Por favor, inténtalo de nuevo.',
        buttons: ['OK']
      });
    
      await alert.present();
    }
  }
  


