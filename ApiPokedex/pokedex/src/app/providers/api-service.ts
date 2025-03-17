import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Pokemon } from '../modelo/Pokemon';

/*

@Injectable() es un decorador en Angular que marca una clase como un servicio inyectable. 

Se utiliza para declarar servicios que proporcionan lógica reutilizable o comparten datos entre diferentes partes de una aplicación Angular. Estos servicios suelen ser inyectados en componentes u otras clases usando el sistema de inyección de dependencias de Angular.

*/

@Injectable()

export class ApiServiceProvider {

    totalPokemons = 0;

    constructor(public http: HttpClient) {

    }


    getPokemons(offset: number, limit: number): Promise<Pokemon[]> {

        let promise = new Promise<Pokemon[]>((resolve, reject) => {

            this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).toPromise()

                .then((data: any) => {

                    this.totalPokemons = data.count
                    let pokemons: Pokemon[] = [];
                    data.results.forEach((pokemon: any) => {
                        let name = pokemon.name;

                        this.http.get(pokemon.url).toPromise()
                            .then((pokemon: any) => {
                                let types: string[] = [];
                                pokemon.types.forEach((type: any) => {
                                    types.push(type.type.name);
                                });

                                let abilities: string[] = [];
                                pokemon.abilities.forEach((ability: any) => {
                                    abilities.push(ability.ability.name);
                                });
                                let spriteFront = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
                                    || pokemon.sprites.front_default;

                                let spriteBack = pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default
                                    || pokemon.sprites.back_default;

                                pokemons.push(
                                    new Pokemon(
                                        pokemon.id,
                                        name,
                                        types,
                                        pokemon.weight,
                                        pokemon.height,
                                        abilities,
                                        spriteFront,
                                        spriteBack,
                                        pokemon.spriteActive = spriteFront
                                    )
                                )

                                pokemons.sort((a, b) => a.id - b.id);

                            })
                    });

                    resolve(pokemons);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }

    getNames(): Promise<string[]> {

        let promise = new Promise<string[]>((resolve, reject) => {

            this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1304`).toPromise()
                .then((data: any) => {
                    let names: string[] = [];
                    data.results.forEach((pokemon: any) => {
                        names.push(pokemon.name);
                    });
                    resolve(names);
                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }

    getPokemonsFilter(nombresPokemon: string[]): Promise<Pokemon[]> {
        let promise = new Promise<Pokemon[]>((resolve, reject) => {
            let pokemons: Pokemon[] = [];
            nombresPokemon.forEach((nombrePokemon: string) => {
                this.http.get(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`).toPromise()
                    .then((pokemon: any) => {
                        let types: string[] = [];
                        pokemon.types.forEach((type: any) => {
                            types.push(type.type.name);
                        });

                        let abilities: string[] = [];
                        pokemon.abilities.forEach((ability: any) => {
                            abilities.push(ability.ability.name);
                        });
                        let spriteFront = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
                            || pokemon.sprites.front_default;

                        let spriteBack = pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default
                            || pokemon.sprites.back_default;

                        pokemons.push(
                            new Pokemon(
                                pokemon.id,
                                nombrePokemon,
                                types,
                                pokemon.weight,
                                pokemon.height,
                                abilities,
                                spriteFront,
                                spriteBack,
                                pokemon.spriteActive = spriteFront
                            )
                        )

                        pokemons.sort((a, b) => a.id - b.id);

                    })
                    .catch((error: Error) => {

                        reject(error.message);
    
                    });
            })
            resolve(pokemons);
        });
        return promise;

    }

}//end_class


