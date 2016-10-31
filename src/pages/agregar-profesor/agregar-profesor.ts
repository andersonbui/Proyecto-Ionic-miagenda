import {Component} from "@angular/core";
import {NavController, NavParams, AlertController, ViewController, ToastController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';

//providers
import { Profesor } from "../../providers/profesor";
import { ServicioProfesor }  from "../../providers/servicio-profesor";

@Component({
    templateUrl: 'agregar-profesor.html'
})
export class AgregarProfesorPage {

    public profesor: Profesor;
    public myForm: FormGroup;

    public constructor(
        private navController: NavController,
        private navParams: NavParams,
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public servProfesor: ServicioProfesor,
        private toast: ToastController,
        private formBuilder: FormBuilder
    ) {
        this.profesor = new Profesor;

        this.myForm = formBuilder.group({
            'idprofesor': [''],
            'nombre': ['',Validators.required],
            'telefono': [''],
            'email': [''],
            'oficina': ['']
        });
    }

    ionViewLoaded() {

    }

    public onPageDidEnter() {

    }
    public onSubmit(formData) {
    }

    agregar(formData) {
        var obj =  JSON.stringify(this.profesor);
        this.profesor = JSON.parse(obj);
        console.log("entro leer profesores" +JSON.stringify(this.profesor)+ "hola");
        this.servProfesor.insert(formData).subscribe((res) => {
            console.log("objetyo devuelto=> "+JSON.stringify(res));
            if (res.success) {/*
                let confirm = this.alertCtrl.create({
                    title: 'Agregar',
                    message: 'Se agrego correctamente el profesor => ' + this.profesor,
                    buttons: [
                        {
                            text: 'Aceptar',
                            handler: () => {
                                console.log('Se edito un profesor');
                            }
                        }
                    ]
                });
                confirm.present();
                this.viewCtrl.dismiss();*/
                this.toast.create({ message: "Se agrego el profesor!", duration: 3000 }).present();
            } else {
                this.toast.create({ message: "Error!", duration: 3000 }).present();
            }
        }, (err) => {
            this.toast.create({ message: "Error grave!", duration: 3000 }).present();
        });
    }

    cancelar() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss();
    }
}