import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from '../models/Equipo';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: false
})
export class DetailsPage implements OnInit {
  public equipo:any;
  public selectedCollection: string=""
  public show: boolean = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.equipo = JSON.parse(params["objeto"]); //para objetos
      this.selectedCollection = params["coleccion"];
    });
  }
  public mostrar(){
    this.show = !this.show;
  }

}
