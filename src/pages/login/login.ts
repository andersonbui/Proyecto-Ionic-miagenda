import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { TableroPage } from "../tablero/tablero";
//providers
import { ServicioAutenticacion }  from "../../providers/servicio-autenticacion";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;

  constructor(public nav: NavController,
    public platform: Platform,
    public http: Http,
    private toast: ToastController,
    public servicioAutent: ServicioAutenticacion) {
    this.username = "milton";
    this.password = "milton";
  }

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  login() {
    this.servicioAutent.login(this.username, this.password).subscribe(
      (data) => {
        console.log("user:"+data.user.user);
        //console.log("pass:"+data.user.pass);
        ServicioAutenticacion.idusuario = data.user.idusuario;
        console.log('carambas');

        if (data.success) {
          if (data.user) {
            this.toast.create({ message: "Exito!", duration: 3000 }).present();
            this.nav.setRoot(TableroPage,{ "user": data.user.user });
          }
        } else {
          this.toast.create({ message: data.msg, duration: 3000 }).present();
        }
      },
      (err) => {
        this.toast.create({ message: "Error!" + err, duration: 3000 }).present();
      }
    );

  }

  processResponse(success: boolean) {
    let msg;
    if (success) {
      msg = this.toast.create({ message: "Exito!", duration: 3000 });
    } else {
      msg = this.toast.create({ message: "Error!", duration: 3000 });
    }
    msg.present();
  }

}
