import {Component} from "@angular/core";
import {NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';

//providers
import { Asignatura } from "../../providers/asignatura";
import { ServicioAsignatura }  from "../../providers/servicio-asignatura";

@Component({
    templateUrl: 'editar-asignatura.html'
})
export class EditarAsignaturaPage {

    public myForm: FormGroup;
    public asignatura: Asignatura;

    public constructor(
        private navController: NavController,
        private navParams: NavParams,
        public viewCtrl: ViewController,
        public servAsignatura: ServicioAsignatura,
        private toast: ToastController,
        private formBuilder: FormBuilder
    ) {
        this.asignatura = navParams.get("asignatura");

        this.myForm = formBuilder.group({
            'idasignatura': [this.asignatura.idasignatura,Validators.required],
            'nombre': [this.asignatura.nombre, [Validators.required,Validators.minLength(5)]],
            'acronimo': [this.asignatura.acronimo,[]],
            'creditos': [this.asignatura.creditos]
        });
    }

    public onPageDidEnter() {

    }

    aceptar(asignat) {
        this.servAsignatura.update(asignat.idasignatura,asignat).subscribe((res) => { 
            let nombre=this.asignatura.nombre;
            this.toast.create({ message: "Se actualizó el(la) asignatura(a): "+nombre, duration: 3000 }).present();
            this.viewCtrl.dismiss();
        }, (err) => {
            this.toast.create({ message: "Error grave!", duration: 3000 }).present();
        });
    }

    cancelar() {
        this.viewCtrl.dismiss();
    }
}