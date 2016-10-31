import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, ViewController, ToastController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';

//providers
import { Asignatura } from "../../providers/asignatura";
import { ServicioAsignatura }  from "../../providers/servicio-asignatura";

@Component({
    templateUrl: 'agregar-asignatura.html'
})
export class AgregarAsignaturaPage {

    public asignatura: Asignatura;
    public myForm: FormGroup;

    public constructor(
        private navController: NavController,
        private navParams: NavParams,
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public servAsignatura: ServicioAsignatura,
        private toast: ToastController,
        private formBuilder: FormBuilder
    ) {
        this.asignatura = new Asignatura;

        this.myForm = formBuilder.group({
            'idasignatura': [''],
            'nombre': ['',Validators.required],
            'acronimo': [''],
            'creditos': ['']
        });
    }

    ionViewLoaded() {

    }

    public onPageDidEnter() {

    }
    public onSubmit(formData) {
    }

    agregar(formData) {
        this.servAsignatura.insert(formData).subscribe((res) => {
            console.log("objetyo devuelto=> "+JSON.stringify(res));
            if (res.success) {
                let confirm = this.alertCtrl.create({
                    title: 'Agregar',
                    message: 'Se agrego correctamente el asignatura => ' + formData.nombre,
                    buttons: [
                        {
                            text: 'Aceptar',
                            handler: () => {
                                console.log('Se edito un asignatura');
                            }
                        }
                    ]
                });
                confirm.present();
                this.viewCtrl.dismiss();
                this.toast.create({ message: "Se agrego el asignatura!", duration: 3000 }).present();
            } else {
                this.toast.create({ message: "Error!", duration: 3000 }).present();
            }
        }, (err) => {
            this.toast.create({ message: "Error grave!", duration: 3000 }).present();
        });
    }

    cancelar() {
        this.viewCtrl.dismiss();
    }
}