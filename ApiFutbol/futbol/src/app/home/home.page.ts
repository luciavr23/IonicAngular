import { Component } from '@angular/core';
import { Equipo } from '../models/Equipo';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { OnInit } from '@angular/core';
import { ApiServiceProvider } from '../providers/api-service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SearchModalPage } from '../search-modal/search-modal.page';

enum collectionEnum {
  PRIMERA = "primera_division",
  SEGUNDA = "segunda_division",
  TERCERA = "tercera_division"
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  public currentPage = 1;
  public pageSize = 6;
  public equipos = new Array<Equipo>();
  public equiposTotal = new Array<Equipo>();
  colecciones = ["primera_division", "segunda_division", "tercera_division"]
  selectedCollection: string = collectionEnum.PRIMERA;
  open: boolean = false;

  constructor(private apiService: ApiServiceProvider, private storage: Storage,
    private toastController: ToastController, private navCtrl: NavController, public alertController: AlertController, private modalCtrl: ModalController) { }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('selectedCollection').then((val) => {
      this.selectedCollection = val || collectionEnum.PRIMERA;
      this.loadColeccion();
    }).catch(() => {
      this.presentToast("Error al recuperar las divisiones");
    });
    this.totalColeccion();
  }

  //GESTIONA EL STORAGE
  guardarOpcion(event: any) {
    this.storage.set('selectedCollection', event.detail.value).then(() => {
      this.selectedCollection = event.detail.value;
      this.loadColeccion();
      this.totalColeccion();
    });
    this.currentPage = 1;
  }

  //CARGA DE DATOS
  loadColeccion(): void {
    this.open = false;
    this.apiService.getColeccionPaginados((this.currentPage - 1) * this.pageSize, ((this.currentPage - 1) * this.pageSize) + this.pageSize, this.selectedCollection)
      .then((arrayP: Equipo[]) => {
        this.equipos = arrayP;
        console.log(this.equipos);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 2000 });
    await toast.present();
  }

  totalColeccion(): void {
    this.apiService.getColeccion(this.selectedCollection)
      .then((arrayP: Equipo[]) => {
        this.equiposTotal = arrayP;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  //NAVEGAR A LA PAGINA DE DETALLES
  goDetails(values: any) {

    let navigationExtras: NavigationExtras = {

      queryParams: {

        objeto: JSON.stringify(values),
        coleccion: this.selectedCollection,
      }

    };
    this.navCtrl.navigateForward('/details', navigationExtras);
  }

  //FILTRADO

  //PRIMERA FORMA: CON MODAL
  async abrirModalBusqueda() {
    //passar a la modal la coleccion en la que estoy
    const select = this.selectedCollection;
    this.navCtrl.navigateForward('/search-modal?select=' + select);


    const modal = await this.modalCtrl.create({
      component: SearchModalPage,
    });
    await modal.present();

    // Recoge los datos al cerrar el modal

    const { data } = await modal.onDidDismiss();

    if (data) {
      const { ciudad, puntos } = data;
      // Llama al servicio para buscar los alumnos
      this.buscarEquipos(ciudad, puntos);
    }

  }


  buscarEquipos(ciudad: string, puntos: number) {
    this.open = true;

    this.apiService

      .filtrar(ciudad, puntos, this.selectedCollection)

      .then((resultados) => {

        if (resultados.length == this.equiposTotal.length) {
          this.loadColeccion();
        } else {
          this.equipos = resultados; // Almacena los resultados en la lista
        }
        console.log('Resultados encontrados:', this.equipos);

      })

      .catch((error) => {

        console.error('Error al buscar equipos:', error);

      });

  }

  //SEGUNDA FORMA:SIN MODAL , CON UN ALERT
  async buscarEquipo() {

    const alert = await this.alertController.create({

      header: 'Buscar Equipos',

      inputs: [

        {

          name: 'ciudad',

          type: 'text',

          value: '',

          placeholder: 'Introduce la ciudad'

        },

        {

          name: 'puntos',

          type: 'number',

          value: '',

          placeholder: 'Introduce el mínimo de puntos'

        }],

      buttons: [

        {

          text: 'Cancel',

          role: 'cancel',

          cssClass: 'secondary',

          handler: () => {
            this.open = true;
            console.log('Confirm Cancel');

          }

        }, {

          text: 'Buscar',

          handler: (data) => {

            this.buscarEquipos(data['ciudad'], data['puntos']);

          }

        }

      ]

    });

    await alert.present();

  }


  //PAGINACION

  goToFirstPage(): void {

    this.currentPage = 1;

    this.loadColeccion();

  }

  goToPreviousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadColeccion();

    }

  }


  goToNextPage(): void {
    if (this.equiposTotal.length != 0 && this.currentPage < Math.ceil(this.equiposTotal.length / this.pageSize)) {
      this.currentPage++;
      this.loadColeccion();
    }

  }


  goToLastPage(): void {
    if (this.equiposTotal.length > 0) {
      this.currentPage = Math.ceil(this.equiposTotal.length / this.pageSize);
      this.loadColeccion();
    }
  }


}
