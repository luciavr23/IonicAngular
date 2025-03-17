import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceProvider } from '../providers/api-service';

@Component({

 selector: 'app-search-modal',

 templateUrl: './search-modal.page.html',

 styleUrls: ['./search-modal.page.scss'],
 standalone: false

})

export class SearchModalPage  {

  ciudad: string = '';

  puntos?: number;

  selected: any;  

  ciudades?:string[] = [];


 constructor(private modalCtrl: ModalController,private route: ActivatedRoute,private apiService: ApiServiceProvider) {}


 ngOnInit() {

  this.route.queryParams.subscribe((params) => {
    this.selected = params['select']; 
  });
  

  this.apiService.getCiudades(this.selected).then((data) => {
    this.ciudades = data;
  }
  ).catch((error) => {
    console.log(error);
  }
  );

  console.log(this.selected);
  console.log(this.ciudades);
}


 dismissModal() {

   this.modalCtrl.dismiss();

 }



 search() {

   this.modalCtrl.dismiss({ 
     ciudad: this.ciudad,
     puntos: this.puntos
   });

 }

}

