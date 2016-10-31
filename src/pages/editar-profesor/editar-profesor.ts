import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from 'ionic-angular';
//providers
import { Profesor } from "../../providers/profesor";
import { ServicioProfesor }  from "../../providers/servicio-profesor";

@Component({
    templateUrl: 'editar-profesor.html'
})
export class EditarProfesorPage {

    public itemList: Array<Object>;
    public profesor: Profesor;
    
    public constructor(
        private navController: NavController,
        private navParams: NavParams,
        public viewCtrl: ViewController,
        public servProfesor: ServicioProfesor
    ) {
        this.profesor = navParams.get("profesor");
        this.itemList = [];
    }

    public onPageDidEnter() {
       
    }


    aceptar() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }

    cancelar() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }
}