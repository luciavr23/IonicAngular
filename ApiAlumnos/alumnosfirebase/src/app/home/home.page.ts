import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { NavigationExtras } from '@angular/router';

import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';

import { ApiServiceProvider } from '../providers/api-service';

import { Alumno } from '../modelo/Alumno';

import { SearchModalPage } from '../search-modal/search-modal.page';

enum StorageTypeEnum {

  JSON_SERVER = 'JSON_SERVER',

  FIREBASE = 'FIREBASE'

}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,

})
export class HomePage implements OnInit {

  public alumnos = new Array<Alumno>();

  public currentPage = 1;

  public pageSize = 10;

  public totalAlumnos = new Array<Alumno>();

  storageType: string = StorageTypeEnum.JSON_SERVER;

  open: boolean = false;

  constructor(private apiService: ApiServiceProvider, public alertController: AlertController, private modalCtrl: ModalController,
    private storage: Storage, private toastController: ToastController) {

  }

  /*
  
  cuando se carga la pantalla se llama al método getAlumnos de la Api. Este es un método asíncrono que devuelve un objeto Promise del que debe ser evaluado el resultado.
  
  Si el acceso a la Api ha ido bien se ejecuta el código asociado a la cláusula then.  Símplemente se coge el array de alumnos que llega y se asocia a él el atributo alumnos de la clase.
  
  Si ha ido mal el acceso (por ejemplo si no hemos lanzado jsonServer) se coge el error que llega y se muestra por consola.
  
  */


  async ngOnInit(): Promise<void> {

    await this.storage.create(); // Asegura que el Storage está inicializado

    this.storage.get('storageType').then((val) => {

      this.storageType = val || StorageTypeEnum.JSON_SERVER;

      this.loadAlumnos();

    }).catch(() => {

      this.presentToast("Error al recuperar la opción de conexión");

    });

    this.totalAlumno();

  }

  totalAlumno(): void {

    this.apiService.getAlumnos()

      .then((alumnos: Alumno[]) => {

        this.totalAlumnos = alumnos;

      })

      .catch((error: string) => {

        console.log(error);

      });

  }
  loadAlumnos(): void {

    if (this.storageType === StorageTypeEnum.JSON_SERVER) {

      this.apiService.getAlumnosPaginados((this.currentPage - 1) * 10, ((this.currentPage - 1) * 10) + this.pageSize)

        .then((alumnos: Alumno[]) => {

          this.alumnos = alumnos; // Sobrescribe en la primera página

          console.log(this.alumnos);

        })

        .catch((error: string) => {

          console.log(error);

        });

    } else {

      this.presentToast("Aún no se ha implementado la conexión a Firebase");

    }

  }

  goToFirstPage(): void {

    this.currentPage = 1;

    this.loadAlumnos();

  }

  goToPreviousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadAlumnos();

    }

  }


  goToNextPage(): void {
    if(this.alumnos.length !=0 && this.currentPage < Math.ceil(this.totalAlumnos.length / this.pageSize)){
    this.currentPage++;
    this.loadAlumnos();
    }

  }


  goToLastPage(): void {
    if(this.alumnos.length !=0){

    // Puedes implementar una llamada adicional para determinar la cantidad total de páginas.

    console.log(this.totalAlumnos.length);

    console.log(this.pageSize);

    this.currentPage = Math.ceil(this.totalAlumnos.length / this.pageSize);

    this.loadAlumnos();
    }

  }



  /*
  
  este método llama al método eliminarAlumno de la Api y le pasa el id del alumno a eliminar. 
  Se devuelve un objeto Promise. 
  Si el borrado ha ido bien se ejecuta el código asociado a la cláusula then. 
  Símplemente se muestra por consola un mensaje y se elimina el alumno del array de alumnos de la clase, 
  lo que hará que deje de verse en la vista.
  
  Si el borrado ha ido mal muestro por consola el error que ha ocurrido.
  
  */

  eliminarAlumno(indice: number) {

    this.apiService.eliminarAlumno(this.alumnos[indice].id)

      .then((correcto: Boolean) => {

        console.log("Borrado correcto del alumno con indice: " + indice);

        this.alumnos.splice(indice, 1);

      })

      .catch((error: string) => {

        console.log("Error al borrar: " + error);

      });

  }//end_eliminar_alumno


  eliminarAlumnos() {
    console.log("Empieza a eliminar alumnos");
    for (let i = 0; i < this.alumnos.length; i++) {
      this.eliminarAlumno(i);
    }//end_eliminar_alumnos
    console.log("Alumnos eliminados");
  }

  async modificarAlumno(indice: number) {

    let alumno = this.alumnos[indice];

    const alert = await this.alertController.create({

      header: 'Modificar',

      inputs: [

        {

          name: 'first_name',

          type: 'text',

          value: alumno.first_name,

          placeholder: 'first_name'

        },

        {

          name: 'last_name',

          type: 'text',

          id: 'last_name',

          value: alumno.last_name,

          placeholder: 'last_name'

        },

        {

          name: 'email',

          id: 'email',

          type: 'text',

          value: alumno.email,

          placeholder: 'email'

        },

        {

          name: 'gender',

          id: 'gender',

          type: 'text',

          value: alumno.gender,

          placeholder: 'gender'

        },

        {

          name: 'avatar',

          value: alumno.avatar,

          type: 'url',

          placeholder: 'avatar'

        },

        {

          name: 'address',

          value: alumno.address,

          type: 'text',

          placeholder: 'address'

        },

        {

          name: 'city',

          value: alumno.city,

          type: 'text',

          placeholder: 'city'

        },

        {

          name: 'postalCode',

          value: alumno.postalCode,

          type: 'text',

          placeholder: 'postalCode'

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

            var alumnoModificado: Alumno = new Alumno(

              alumno.id,

              data['gender'],

              data['first_name'],

              data['last_name'],

              data['email'],

              data['avatar'],

              data['address'],

              data['city'],

              data['postalCode']);

            this.apiService.modificarAlumno(alumnoModificado)

              .then((alumno: Alumno) => {

                this.alumnos[indice] = alumno;

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

  }//end_modificarAlumno

  async confirmarEliminar() {


    const alert = await this.alertController.create({

      header: '¿Está seguro de que desea eliminar todos los alumnos?',

      buttons: [

        {

          text: 'Cancel',

          role: 'cancel',

          cssClass: 'secondary',

          handler: () => {
            console.log('Confirm Cancel');
          }

        }, {

          text: 'Sí',

          handler: () => {
            this.eliminarAlumnos();
            console.log('Confirm Ok');
          }

        }

      ]

    });

    await alert.present();

  }//end_modificarAlumno

  // Llama al servicio para buscar alumnos

  buscarAlumnos(nombre: string, apellido: string, gender: string) {
    this.open = true;

    this.apiService

      .filtrar(nombre, apellido, gender)

      .then((resultados) => {

        if (resultados.length == this.totalAlumnos.length) {
          this.loadAlumnos();
        } else {
          this.alumnos = resultados; // Almacena los resultados en la lista
        }
        console.log('Resultados encontrados:', this.alumnos);

      })

      .catch((error) => {

        console.error('Error al buscar alumnos:', error);

      });

  }

  guardarOpcion(event: any) {

    this.storage.set('storageType', event.detail.value).then(() => {

      this.storageType = event.detail.value;
      if(this.storageType === StorageTypeEnum.FIREBASE){
        this.alumnos = [];
        this.presentToast("Aún no se ha implementado la conexión a Firebase");
        this.currentPage = 1;
      }else{
        this.loadAlumnos();
      }

    });

  }
  async presentToast(message: string) {

    const toast = await this.toastController.create({ message, duration: 2000 });

    await toast.present();

  }
  ///////PÁGINA MODAL////////////////
  async abrirModalBusqueda() {

    const modal = await this.modalCtrl.create({

      component: SearchModalPage,

    });



    await modal.present();



    // Recoge los datos al cerrar el modal

    const { data } = await modal.onDidDismiss();

    if (data) {

      const { firstName, lastName, gender } = data;



      // Llama al servicio para buscar los alumnos

      this.buscarAlumnos(firstName, lastName, gender);

    }

  }

  async insertarAlumno() {

    const alert = await this.alertController.create({

      header: 'Insertar Alumno',

      inputs: [

        {

          name: 'first_name',

          type: 'text',

          placeholder: 'Nombre'

        },

        {

          name: 'last_name',

          type: 'text',

          placeholder: 'Apellido'

        },

        {

          name: 'email',

          type: 'text',

          placeholder: 'Email'

        },
        {

          name: 'gender',

          type: 'text',

          placeholder: 'Gender'

        },
        {

          name: 'avatar',

          type: 'text',

          placeholder: 'Avatar'

        },
        {

          name: 'adress',

          type: 'text',

          placeholder: 'Adress'

        },
        {

          name: 'city',

          type: 'text',

          placeholder: 'City'

        },
        {

          name: 'postalCode',

          type: 'text',

          placeholder: 'PostalCode'

        }

      ],

      buttons: [

        {

          text: 'Cancelar',

          role: 'cancel',

          handler: () => {

            console.log('Cancelado');

          }

        },

        {

          text: 'Insertar',

          handler: (data) => {

            const nuevoAlumno: Alumno = {
              id: (Number((this.totalAlumnos[this.totalAlumnos.length - 1].id)) + 1).toString(),
              first_name: data.first_name,

              last_name: data.last_name,

              email: data.email,
              gender: data.gender,
              avatar: data.avatar,
              address: data.adress,
              city: data.city,
              postalCode: data.postalCode
            };

            this.apiService.insertarAlumno(nuevoAlumno)

              .then(() => {

                console.log("Alumno insertado correctamente");
                this.alumnos.push(nuevoAlumno);
                this.loadAlumnos()

              })

              .catch((error) => {

                console.log("Error al insertar: " + error);

              });

          }

        }

      ]

    });


    await alert.present();

  }

  async presentToastWithOptions(message: string) {

    const toast = await this.toastController.create({

      message: message,

      duration: 3000,

      position: 'top',

      buttons: [

        {

          text: 'Cerrar',

          role: 'cancel'

        }

      ]

    });

    toast.present();

  }


}//end_class


