import {Component} from "@angular/core";
import {NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';

//providers
import { Profesor } from "../../providers/profesor";
import { ServicioProfesor }  from "../../providers/servicio-profesor";

@Component({
    templateUrl: 'editar-profesor.html'
})
export class EditarProfesorPage {

    public myForm: FormGroup;
    public profesor: Profesor;

    public constructor(
        private navController: NavController,
        private navParams: NavParams,
        public viewCtrl: ViewController,
        public servProfesor: ServicioProfesor,
        private toast: ToastController,
        private formBuilder: FormBuilder
    ) {
        this.profesor = navParams.get("profesor");

        this.myForm = formBuilder.group({
            'idprofesor': [this.profesor.idprofesor],
            'nombre': [this.profesor.nombre, [Validators.required,Validators.minLength(5)]],
            'telefono': [this.profesor.telefono,[]],
            'email': [this.profesor.email],
            'oficina': [this.profesor.oficina]
        });
    }

    public onPageDidEnter() {

    }

    aceptar(profe) {
        this.servProfesor.update(profe.idprofesor,profe).subscribe((res) => { 
            let nombre=this.profesor.nombre;
            this.toast.create({ message: "Se actualizó el(la) profesor(a): "+nombre, duration: 3000 }).present();
            this.viewCtrl.dismiss();
        }, (err) => {
            this.toast.create({ message: "Error grave!", duration: 3000 }).present();
        });
    }

    cancelar() {
        this.viewCtrl.dismiss();
    }
}