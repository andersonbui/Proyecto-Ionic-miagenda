import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, ViewController} from 'ionic-angular';
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
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public servProfesor: ServicioProfesor
    ) {
        this.profesor = navParams.get("profesor");
        this.itemList = [];
    }

    public onPageDidEnter() {
       
    }

    showConfirm() {
        let confirm = this.alertCtrl.create({
            title: 'Eta seguro que desea eliminar?',
            message: 'Do you agree to use this lightsaber ?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        console.log('Se edito un profesor');
                        this.servProfesor.getAll().subscribe((res) => { });
                    }
                }
            ]
        });
        confirm.present();
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