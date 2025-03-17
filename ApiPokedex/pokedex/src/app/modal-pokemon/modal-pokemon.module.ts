import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPokemonPageRoutingModule } from './modal-pokemon-routing.module';

import { ModalPokemonPage } from './modal-pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPokemonPageRoutingModule
  ],
  declarations: [ModalPokemonPage]
})
export class ModalPokemonPageModule {}
