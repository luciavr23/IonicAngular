// src/app/services/firebase.service.ts
import { Injectable } from '@angular/core';
import { getFirestore, query, where} from 'firebase/firestore';
import { Firestore, collection, addDoc, collectionData } from
'@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db = getFirestore();
  constructor() {}

    obtenerAlumnos(): Observable<any[]> {
      const colRef = collection(this.db, 'Alumnos');
      return collectionData(colRef, { idField: 'id' });
      }

    agregarAlumno(data: any) {
      console.log(data);
      const colRef = collection(this.db, 'Alumnos');
      return addDoc(colRef, data);
      }
    buscarAlumno(first_name:string): Observable<any[]> {
        const colRef = collection(this.db, 'Alumnos');
        console.log("Buscando:", first_name);

        const q = query(colRef, 
          where('first_name'.toLowerCase(), '==', first_name)
      );
      console.log(q);
      return collectionData(q, { idField: 'id' });
    }
}

 // Función para obtener los datos de Firestore y devolverlos con Alumno
  /*
   async getData(): Promise<Alumno[]> {
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(this.db, 'Alumnos'));
      const alumnos: Alumno[] = [];

      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data() as Alumno; // 🔹 Forzamos el tipo Alumno
        alumnos.push({
          first_name: data.first_name,
          last_name: data.last_name
        });
      });
      //usamos el operador spread (...) para descomponer el array y pasar sus elementos como argumentos individuales.
      return alumnos;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return [];
    }
  }
/*
  async setData(data: Alumno) {
    console.log(data);
    try {
      await addDoc(collection(this.db, 'Alumnos'), data.first_name);
      console.log('Datos almacenados correctamente');
    } catch (error) {
      console.error('Error al almacenar los datos:', error);
    }
  }*/

