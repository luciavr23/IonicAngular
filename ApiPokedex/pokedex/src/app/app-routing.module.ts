import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page'; 

const routes: Routes = [
  { path: '', component: HomePage },   {
    path: 'modal-pokemon',
    loadChildren: () => import('./modal-pokemon/modal-pokemon.module').then( m => m.ModalPokemonPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
