import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isLogin: boolean = true; // Alternar entre login y registro

  constructor(private authService: AuthService, private router: Router) {}

  async authenticate() {
    try {
      if (this.isLogin) {
        await this.authService.login(this.email, this.password);
      } else {
        await this.authService.register(this.email, this.password);
      }
      this.router.navigate(['/home']); // Redirigir al home tras autenticarse
    } catch (error) {
      console.error('Error en autenticación:', error);
    }
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin; // Cambiar entre login y registro
  }
}
