import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../modelo/Pokemon';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-modal-pokemon',
  templateUrl: './modal-pokemon.page.html',
  styleUrls: ['./modal-pokemon.page.scss'],
  standalone: false,
})
export class ModalPokemonPage implements OnInit {
  mostrar:boolean=false;
  pokemon: any;
  constructor(private modalController: ModalController, private navParams: NavParams,private alertController:AlertController) { }

  ngOnInit() {
    this.pokemon = this.navParams.get('pokemon'); 
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  updateMostrar(){
    this.mostrar=!this.mostrar;
  }
  isGif(url: string): boolean {
    return url.toLowerCase().endsWith('.gif');
  }
}
