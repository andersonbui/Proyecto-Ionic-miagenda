import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the EditarTarea page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editar-tarea',
  templateUrl: 'editar-tarea.html'
})
export class EditarTarea {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello EditarTarea Page');
  }

}
