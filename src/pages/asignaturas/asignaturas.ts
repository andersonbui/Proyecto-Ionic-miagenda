import { Component } from '@angular/core';

import { NavController, NavParams, ModalController } from 'ionic-angular';

import { DetallesAsignaturaPage } from '../detalles-asignatura/detalles-asignatura';
import { AgregarAsignaturaPage } from '../agregar-asignatura/agregar-asignatura';

//providers
import { ServicioAsignatura }  from "../../providers/servicio-asignatura";
import { Asignatura } from "../../providers/asignatura";


@Component({
  templateUrl: 'asignaturas.html'
})
export class AsignaturasPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  asignaturas: Asignatura[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servAsignatura: ServicioAsignatura,
    public modalCtrl: ModalController
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.leerTodosLosAsignaturas(); 
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];
  }

  itemTapped(event, item) {
    this.navCtrl.push(DetallesAsignaturaPage, {
      item: item
    });
  }

  verDetallesAsignatura(event, item) {
    this.navCtrl.push(DetallesAsignaturaPage, {
      asignatura: item
    });
  }

  leerTodosLosAsignaturas() {
    this.servAsignatura.getAll().subscribe((res) => {
      this.asignaturas = res;
      //console.log("entro leer asignaturas" + JSON.stringify(this.asignaturas) + "hola");
    });
  }

  agregarAsignatura() {
    console.log("entro agregar");
    let modal = this.modalCtrl.create(AgregarAsignaturaPage);
    modal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.leerTodosLosAsignaturas();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
