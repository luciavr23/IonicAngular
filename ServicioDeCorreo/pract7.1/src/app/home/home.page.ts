
import { Geolocation } from '@capacitor/geolocation';
import { OnInit } from '@angular/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  contactForm: FormGroup;
  latitude: any;
  longitude: any;

  @ViewChild('formElement') formElement!: ElementRef<HTMLFormElement>;
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      user_name: ['', Validators.required],
      destinity_name: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.Geolocalizacion();
  }

  async Geolocalizacion (){
    const position = await Geolocation.getCurrentPosition();
    console.log('Current position:', position); 
    this.latitude=position.coords.latitude;
    this.longitude=position.coords.longitude;
    console.log('Latitude:', position.coords.latitude); 
    console.log('Longitude:', position.coords.longitude);
  }
  async sendEmail() {
    const position = await Geolocation.getCurrentPosition();
    const templateParams = {
      user_name: this.contactForm.get('user_name')?.value,
      destinity_name: this.contactForm.get('destinity_name')?.value,
      message: this.contactForm.get('message')?.value,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  
    emailjs.send('service_ionic', 'template_kpntj6i', templateParams, 'u-PTQp7udm1z2trHk')
      .then((result) => {
        console.log('Correo enviado correctamente:', result.text);
      }, (error) => {
        console.error('Error al enviar el correo:', error.text);
      });
  
    this.contactForm.reset();
  }
  

}
