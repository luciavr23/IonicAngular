import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Alumno } from '../modelo/Alumno';
import { AlertController, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true,
})
export class HomePage {
  alumnos: any[] = [];  // Variable para almacenar los datos obtenidos
  open:boolean=false;
  constructor(private firebaseService: FirebaseService, private alertController: AlertController, private modalCtrl: ModalController) {}
  ngOnInit() {
    this.loadAlumnos();
  }

  loadAlumnos(){
    this.getDataFromFirestore();
    this.open=false;
    
  }
  // Función para obtener los datos de Firestore
  async getDataFromFirestore() {
    console.log('Llamando a Firestore...');
    this.firebaseService.obtenerAlumnos().subscribe((data) => {
      this.alumnos = data;
      this.alumnos.sort((a, b) => a.last_name.localeCompare(b.last_name));
    });
    
  }

  muestraAl(){
    console.log("alumnos:"+this.alumnos);
  }

  async addAlumno() {

    const alert = await this.alertController.create({

      header: 'Añadir Alumno',

      inputs: [

        {

          name: 'first_name',

          type: 'text',
          id: 'first_name',

          value: '',

          placeholder: 'Nombre'

        },

        {

          name: 'last_name',

          type: 'text',

          id: 'last_name',

          value: '',

          placeholder: 'Apellido'

        }
      ],

      buttons: [

        {

          text: 'Cancel',

          role: 'cancel',

          cssClass: 'secondary',

          handler: () => {

            console.log('Confirm Cancel');

          }

        }, {

          text: 'Ok',

          handler: (data) => {

            console.log(data);
            const alumno={
              first_name: data['first_name'].charAt(0).toUpperCase() + data['first_name'].slice(1),
              last_name: data['last_name'].charAt(0).toUpperCase() + data['last_name'].slice(1)
            }

            this.firebaseService.agregarAlumno(alumno)

              .then(() => {
                this.loadAlumnos();
              })

              .catch((error: string) => {

                console.log(error);

              });

            console.log('Confirm Ok');
            
          }
         
        }

      ]

    });

    await alert.present();

  }

  async abrirModalBusqueda() {
    this.open=true;

    const alert = await this.alertController.create({

      header: 'Buscar Alumno',

      inputs: [

        {

          name: 'first_name',

          type: 'text',
          id: 'first_name',

          value: '',

          placeholder: 'Nombre'

        }
      ],

      buttons: [

        {

          text: 'Cancel',

          role: 'cancel',

          cssClass: 'secondary',

          handler: () => {
            this.open=false

            console.log('Confirm Cancel');

          }

        }, {

          text: 'Ok',

          handler: (data) => {
            
            console.log(data);
            const alumno={
              first_name: data['first_name'],
              last_name: data['last_name']
            }

            this.firebaseService.buscarAlumno(data['first_name'].charAt(0).toUpperCase() + data['first_name'].slice(1))
            .subscribe((data) => {
              console.log(data);
              this.alumnos = data;
            });
            console.log('Confirm Ok');
          }       
        }
      ]
    });

    await alert.present();

  }
  


}
