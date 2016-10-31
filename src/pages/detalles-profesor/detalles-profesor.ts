import {Component} from "@angular/core";
import {ViewController,NavController, NavParams, ModalController,AlertController,ToastController } from 'ionic-angular';
import { EditarProfesorPage } from '../editar-profesor/editar-profesor';
//providers
import { Profesor } from "../../providers/profesor";
import { ServicioProfesor }  from "../../providers/servicio-profesor";

@Component({
    templateUrl: 'detalles-profesor.html'
})
export class DetallesProfesorPage {

    public itemList: Array<Object>;
    public profesor: Profesor;

    public constructor(
        private navController: NavController,
        private viewCtrl: ViewController,
        private navParams: NavParams,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public servProfesor: ServicioProfesor,
        private toast: ToastController
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


    eliminar(idprof) {
        let confirm = this.alertCtrl.create({
            title: 'Eliminar profesor',
            message: 'Esta seguro de eleiminar el profesor: '+ this.profesor.nombre +'?',
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
                        let nombre=this.profesor.nombre;
                        console.log('Se elimino el profesor un profesor');
                        this.servProfesor.delete(""+idprof).subscribe((res) => { });
                        this.toast.create({ message: "Se eliminó el(la) profesor(a): "+nombre, duration: 3000 }).present();
                        this.navController.pop();
                    }
                }
            ]
        });
        confirm.present();
    }
}