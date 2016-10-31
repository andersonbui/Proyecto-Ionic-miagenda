import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav} from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { TableroPage } from '../pages/tablero/tablero';
import { ExamenesPage } from '../pages/examenes/examenes';
import { TareasPage } from '../pages/tareas/tareas';
import { ProfesoresPage } from '../pages/profesores/profesores';
import { AsignaturasPage } from '../pages/asignaturas/asignaturas';
import { ConfiguracionesPage } from '../pages/configuraciones/configuraciones';
import { LoginPage } from '../pages/login/login';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  //rootPage: any = LoginPage;
  rootPage: any = AsignaturasPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Tablero', component: TableroPage },
      { title: 'Examenes', component: ExamenesPage },
      { title: 'Tareas', component: TareasPage },
      { title: 'Profesores', component: ProfesoresPage },
      { title: 'Asignaturas', component: AsignaturasPage },
      { title: 'Configuraciones', component: ConfiguracionesPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
