import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ExamenesPage } from '../pages/examenes/examenes';
import { DetallesExamenPage } from '../pages/detalles-examen/detalles-examen';
import { TareasPage } from '../pages/tareas/tareas';
import { DetallesTareaPage } from '../pages/detalles-tarea/detalles-tarea';
import { ProfesoresPage } from '../pages/profesores/profesores';
import { AgregarProfesorPage } from '../pages/agregar-profesor/agregar-profesor';
import { DetallesProfesorPage } from '../pages/detalles-profesor/detalles-profesor';
import { EditarProfesorPage } from '../pages/editar-profesor/editar-profesor';
import { AsignaturasPage } from '../pages/asignaturas/asignaturas';
import { DetallesAsignaturaPage } from '../pages/detalles-asignatura/detalles-asignatura';
import { ConfiguracionesPage } from '../pages/configuraciones/configuraciones';
import { TableroPage } from '../pages/tablero/tablero';
import { LoginPage } from '../pages/login/login';

//providers
import { ServicioAutenticacion }  from "../providers/servicio-autenticacion";
import { ServicioProfesor }  from "../providers/servicio-profesor";

import { Database } from '../providers/database';

@NgModule({
  declarations: [
    MyApp,
    DetallesExamenPage,
    ExamenesPage,
    TareasPage,
    DetallesTareaPage,
    ProfesoresPage,
    AgregarProfesorPage,
    DetallesProfesorPage,
    EditarProfesorPage,
    AsignaturasPage,
    DetallesAsignaturaPage,
    ConfiguracionesPage,
    TableroPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ExamenesPage,
    DetallesExamenPage,
    TareasPage,
    DetallesTareaPage,
    ProfesoresPage,
    AgregarProfesorPage,
    DetallesProfesorPage,
    EditarProfesorPage,
    AsignaturasPage,
    DetallesAsignaturaPage,
    ConfiguracionesPage,
    TableroPage,
    LoginPage
  ],
  providers: [
    Database,
    ServicioAutenticacion,
    ServicioProfesor
  ]
})
export class AppModule { }
