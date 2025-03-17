import { Component } from '@angular/core';
import { ApiServiceProvider } from '../providers/api-service';
import { Pokemon } from '../modelo/Pokemon';
import { ModalPokemonPage } from '../modal-pokemon/modal-pokemon.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  public currentPage = 1;

  public pageSize = 8;

  open: boolean = false;

  names: string[] = [];

  pokemons: Pokemon[] = [];

  constructor(private pokemonService: ApiServiceProvider, private modalController: ModalController) {

  }

  /*---------------MÉTODOS DE CARGA-------------------*/
  ngOnInit(): void {
    this.loadPokemon();
    this.cargarNombres();
  }

  loadPokemon(): void {
    this.open = false;

    this.pokemonService.getPokemons((this.currentPage - 1) * this.pageSize, this.pageSize)
      .then((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  cargarNombres(): void {
    this.pokemonService.getNames()
      .then((names: string[]) => {
        this.names = names;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  /*---------------MÉTODOS PAGINACIÓN-------------------*/
  goToNextPage(): void {
    const totalPages = Math.ceil(this.pokemonService.totalPokemons / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.loadPokemon();
    }
  }

  goToLastPage(): void {

    this.currentPage = Math.ceil(this.pokemonService.totalPokemons / this.pageSize);

    this.loadPokemon();

  }

  goToFirstPage(): void {

    this.currentPage = 1;

    this.loadPokemon();

  }

  goToPreviousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadPokemon();

    }

  }

  /*---------------MÉTODO FILTRAR-------------------*/
  search(event: any): void {
    let pokSearch = event.target.value.toLowerCase();
    if(pokSearch==""){
      this.loadPokemon();
      return;
    }
    let pokemonsFiltro: string[] = [];

    this.names.forEach((nombrePokemon: string) => {
      if (nombrePokemon.toLowerCase().includes(pokSearch)) {
        pokemonsFiltro.push(nombrePokemon);
      }
    });

    if(pokemonsFiltro.length != 0){
    this.pokemonService.getPokemonsFilter(pokemonsFiltro)
      .then((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      })
      .catch((error: string) => {
        console.log(error);
      });
    } 
  }


   /*---------------MÉTODO ALERT-------------------*/

  async mostrarPokemon(pokemon: Pokemon) {
    const modal = await this.modalController.create({
      component: ModalPokemonPage,
      componentProps: {
        'pokemon': pokemon
      }
    });
    return await modal.present();
  }

  /*---------------FORMATEO DE FOTO-------------------- */

  isGif(url: string): boolean {
    return url.toLowerCase().endsWith('.gif');
  }

}
