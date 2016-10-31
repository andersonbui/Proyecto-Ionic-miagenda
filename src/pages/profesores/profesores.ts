import { Component } from '@angular/core';

import { NavController, NavParams, ModalController } from 'ionic-angular';

import { DetallesProfesorPage } from '../detalles-profesor/detalles-profesor';
import { AgregarProfesorPage } from '../agregar-profesor/agregar-profesor';

//providers
import { ServicioProfesor }  from "../../providers/servicio-profesor";
import { Profesor } from "../../providers/profesor";

@Component({
  templateUrl: 'profesores.html'
})

export class ProfesoresPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  profesores: Profesor[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servProfesor: ServicioProfesor,
    public modalCtrl: ModalController
  ) {
    this.profesores = [];

    console.log('Hola profesor Provider');
    this.leerTodosLosProfesores();
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(DetallesProfesorPage, {
      item: item
    });
  }

  verDetallesProfesor(event, item) {
    this.navCtrl.push(DetallesProfesorPage, {
      profesor: item
    });
  }

  leerTodosLosProfesores() {
    this.servProfesor.getAll().subscribe((res) => {
      this.profesores = res;
      //console.log("entro leer profesores" + JSON.stringify(this.profesores) + "hola");
    });
  }

  agregarProfesor() {
    console.log("entro agregar");
    let modal = this.modalCtrl.create(AgregarProfesorPage);
    modal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.leerTodosLosProfesores();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
