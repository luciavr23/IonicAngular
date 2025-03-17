
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipo } from '../models/Equipo';

@Injectable()

export class ApiServiceProvider {


    private URL = "http://localhost:3000";


    constructor(public http: HttpClient) {

    }

    getColeccionPaginados(start: number, end: number,coleccion:String): Promise<Equipo[]> {
        return new Promise<Equipo[]>((resolve, reject) => {
            this.http.get(`${this.URL}/${coleccion}?_start=${start}&_end=${end}&_sort=nombre`).toPromise()
                .then((data: any) => {
                    let array = new Array<Equipo>();
                    data.forEach((objeto: any) => {
                        array.push(objeto);
                    });
                    resolve(array);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
    }

    getColeccion(coleccion:string): Promise<Equipo[]>{

        let promise = new Promise<Equipo[]>((resolve, reject) => {

            this.http.get(`${this.URL}/${coleccion}`).toPromise()

                .then((data: any) => {
                    let array = new Array<Equipo>();
                    data.forEach((objeto: any) => {
                        array.push(objeto);
                    });
                    resolve(array);
                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });
        return promise;
    }

    filtrar(ciudad: string, puntos: number,coleccion:string): Promise<Equipo[]> {
        if(puntos==null || puntos==undefined){
            puntos=0;
        }

        ciudad=ciudad.charAt(0).toUpperCase()+ciudad.toLowerCase().substring(1);

        var totalURL="";
        if(ciudad=="" ){
            totalURL = `${this.URL}/${coleccion}?puntos_gte=${puntos}`; 
            /*puntos_gte es una convención utilizada en algunas APIs para realizar un filtrado de datos, 
            específicamente en sistemas que permiten consultas basadas en parámetros en la URL. 
            En este caso:
            puntos: Hace referencia al campo o atributo que quieres filtrar (en este caso, el número de puntos de un equipo).
            gte: Significa "greater than or equal to" (mayor o igual a)*/
        }else{
            totalURL=`${this.URL}/${coleccion}?ciudad=${ciudad}&puntos_gte=${puntos}`;
        }

        return new Promise<Equipo[]>((resolve, reject) => {
            this.http.get(totalURL).toPromise()

                .then((data: any) => {

                    let equipos = new Array<Equipo>();

                    data.forEach((equipo: any) => {
                        equipos.push(equipo);

                    });
                    resolve(equipos);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

    }

    getCiudades(coleccion:string): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this.http.get(`${this.URL}/${coleccion}`).toPromise()
                .then((data: any) => {
                    console.log(data);
                    let ciudades = new Array<string>();
                    data.forEach((data: any) => {
                        console.log(data.ciudad);
                        ciudades.push(data.ciudad);
                    });
                    console.log("array",ciudades);
                    resolve(ciudades);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
    }
}