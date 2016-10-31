import {Component} from "@angular/core";
import {ViewController,NavController, NavParams, ModalController,AlertController,ToastController } from 'ionic-angular';
import { EditarAsignaturaPage } from '../editar-asignatura/editar-asignatura';
//providers
import { Asignatura } from "../../providers/asignatura";
import { ServicioAsignatura }  from "../../providers/servicio-asignatura";

@Component({
    templateUrl: 'detalles-asignatura.html'
})
export class DetallesAsignaturaPage {

    public itemList: Array<Object>;
    public asignatura: Asignatura;

    public constructor(
        private navController: NavController,
        private viewCtrl: ViewController,
        private navParams: NavParams,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public servAsignatura: ServicioAsignatura,
        private toast: ToastController
    ) {
        this.asignatura = navParams.get("asignatura");
        this.itemList = [];
    }

    public onPageDidEnter() {
        //this.editar();
    }

    openEditar() {

        let modal = this.modalCtrl.create(EditarAsignaturaPage, {
            asignatura: this.asignatura
        });
        modal.present();
    }


    eliminar(idprof) {
        let confirm = this.alertCtrl.create({
            title: 'Eliminar asignatura',
            message: 'Esta seguro de eleiminar el asignatura: '+ this.asignatura.nombre +'?',
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
                        let nombre=this.asignatura.nombre;
                        console.log('Se elimino el asignatura un asignatura');
                        this.servAsignatura.delete(""+idprof).subscribe((res) => { });
                        this.toast.create({ message: "Se eliminó el(la) asignatura(a): "+nombre, duration: 3000 }).present();
                        this.navController.pop();
                    }
                }
            ]
        });
        confirm.present();
    }
}
