import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPokemonPage } from './modal-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPokemonPageRoutingModule {}
