import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Alumno } from '../modelo/Alumno';


/*

@Injectable() es un decorador en Angular que marca una clase como un servicio inyectable. 

Se utiliza para declarar servicios que proporcionan lógica reutilizable o comparten datos entre diferentes partes de una aplicación Angular. Estos servicios suelen ser inyectados en componentes u otras clases usando el sistema de inyección de dependencias de Angular.

*/

@Injectable()

export class ApiServiceProvider {


    private URL = "http://localhost:3000";


    constructor(public http: HttpClient) {

    }


    /*
    
        El siguiente método devuelve un objeto 'Promise'.
    
    Esto es un elemento asíncrono que puede finalizar de dos formas: correctamente, en cuyo caso sale con resolve, o bien de forma incorrecta, acabando en ese caso con reject.
    
    El método llama al método get del atributo http, pasándole como parámetro la url que devuelve la colección alumnos de la Api.
    
    Lo que devuelve este método lo convertimos a Promise, para luego evaluar su resultado mediante then y catch.
    
    Si el acceso a la Api ha ido bien el código que se ejecuta es el ubicado en la cláusula then. Si ha ido mal se ejecuta el código ubicado en la cláusula catch.
    
    Si todo ha ido bien convertimos el array de objetos Json que nos llega a un array de objetos alumnos, y lo devolvemos con resolve.
    
    Si el acceso ha ido mal devolvemos el mensaje de error que no llega mediante reject.
    
    */


    getAlumnos(): Promise<Alumno[]> {

        let promise = new Promise<Alumno[]>((resolve, reject) => {

            this.http.get(this.URL + "/alumnos").toPromise()

                .then((data: any) => {

                    let alumnos = new Array<Alumno>();

                    data.forEach((alumno: Alumno) => {

                        console.log(alumno);

                        alumnos.push(alumno);

                    });

                    resolve(alumnos);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }//end_getAlumnos


    /*
    
    Este método manda una solicitud de borrado a la Api del usuario con un id determinado.
    
    Si el borrado va bien se sale son resolve devolviendo true.
    
    Si el borrado va mal se sale con reject, devolviendo el mensaje de error que nos llega
    
    */


    eliminarAlumno(id: string): Promise<Boolean> {

        let promise = new Promise<Boolean>((resolve, reject) => {

            this.http.delete(this.URL + "/alumnos/" + id).toPromise().then(

                (data: any) => { // Success

                    console.log(data)

                    resolve(true);

                }

            )
                .catch((error: Error) => {

                    console.log(error.message);

                    reject(error.message);

                });

        });

        return promise;

    }//end_eliminar_alumno

    //donde esta el json?
    //esta fuera d esta carpeta, esta es la carpeta del proyecto


    /*método que permitirá modificar los datos de un alumno. 
    Este método hará una petición put a la api pasándole en la url el id del alumno a modificar*/
    modificarAlumno(nuevosDatosAlumno: Alumno): Promise<Alumno> {
        let promise = new Promise<Alumno>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(nuevosDatosAlumno);
            this.http.put(this.URL + "/alumnos/" + nuevosDatosAlumno.id,
                datos,
                header).toPromise().then(
                    (data: any) => { // Success
                        let alumno: Alumno;
                        alumno = data;
                        resolve(alumno);
                    }
                )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_modificar_alumno

    getAlumnosPaginados(start: number, end: number): Promise<Alumno[]> {
        return new Promise<Alumno[]>((resolve, reject) => {
            this.http.get(`${this.URL}/alumnos?_start=${start}&_end=${end}&_sort=last_name`).toPromise()
                .then((data: any) => {
                    let alumnos = new Array<Alumno>();
                    console.log(`${this.URL}/alumnos?_start=${start}&_end=${end}`);
                    data.forEach((alumno: Alumno) => {
                        alumnos.push(alumno);
                    });
                    resolve(alumnos);

                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
    }

    /*método para la búsqueda de alumnos */
    filtrar(nombre: string, apellido: string, genero: string): Promise<Alumno[]> {

        nombre = nombre.charAt(0).toUpperCase() + nombre.toLowerCase().substring(1);
        apellido = apellido.charAt(0).toUpperCase() + apellido.toLowerCase().substring(1);
        genero = genero.charAt(0).toUpperCase() + genero.toLowerCase().substring(1);

        var totalURL = "";
        if (nombre == "" && apellido == "" && genero == "") {
            totalURL = `${this.URL}/alumnos`;
        } else if (nombre == "" && apellido == "" && genero != "") {
            totalURL = `${this.URL}/alumnos?gender=${genero}`;
        } else if (nombre == "" && apellido != "" && genero == "") {
            totalURL = `${this.URL}/alumnos?last_name=${apellido}`;
        } else if (nombre == "" && apellido != "" && genero != "") {
            totalURL = `${this.URL}/alumnos?last_name=${apellido}&gender=${genero}`;
        } else if (nombre != "" && apellido == "" && genero == "") {
            totalURL = `${this.URL}/alumnos?first_name=${nombre}`;
        } else if (nombre != "" && apellido != "" && genero == "") {
            totalURL = `${this.URL}/alumnos?first_name=${nombre}&last_name=${apellido}`;
        } else if (nombre != "" && apellido == "" && genero != "") {
            totalURL = `${this.URL}/alumnos?first_name=${nombre}&gender=${genero}`;
        } else {
            totalURL = `${this.URL}/alumnos?first_name=${nombre}&last_name=${apellido}&gender=${genero}`;
        }

        return new Promise<Alumno[]>((resolve, reject) => {
            this.http.get(totalURL).toPromise()

                .then((data: any) => {

                    let alumnos = new Array<Alumno>();

                    data.forEach((alumno: Alumno) => {

                        alumnos.push(alumno);

                    });

                    resolve(alumnos);

                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

    }

    // Insertar un nuevo alumno

    insertarAlumno(alumno: Alumno): Promise<Boolean> {

        return new Promise<Boolean>((resolve, reject) => {

            this.http.post(this.URL + "/alumnos", alumno).toPromise().then(

                (data: any) => {

                    console.log(data);

                    resolve(true);

                }

            )

                .catch((error: Error) => {

                    console.log(error.message);

                    reject(error.message);

                });

        });

    }

}//end_class


