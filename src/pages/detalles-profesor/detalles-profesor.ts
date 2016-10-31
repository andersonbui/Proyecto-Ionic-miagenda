import {Component} from "@angular/core";
import {NavController, NavParams, ModalController} from 'ionic-angular';
import { EditarProfesorPage } from '../editar-profesor/editar-profesor';
//providers
import { Profesor } from "../../providers/profesor";

@Component({
    templateUrl: 'detalles-profesor.html'
})
export class DetallesProfesorPage {

    public itemList: Array<Object>;
    public profesor: Profesor;

    public constructor(
        private navController: NavController,
        private navParams: NavParams,
        public modalCtrl: ModalController
    ) {
        this.profesor = navParams.get("profesor");
        this.itemList = [];
    }

    public onPageDidEnter() {
        //this.editar();
    }

    openEditar(characterNum) {

        let modal = this.modalCtrl.create(EditarProfesorPage, {
            profesor: this.profesor
        });
        modal.present();
    }
}