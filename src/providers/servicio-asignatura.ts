import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Asignatura } from "./asignatura";
import { IpServico } from "./ip";
//providers
import { ServicioAutenticacion }  from "../providers/servicio-autenticacion";
/*
  Generated class for the AsignaturaClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServicioAsignatura {

  url: string = "http://" + IpServico.ip + "/general";

  constructor(private http: Http) {
    console.log('Hola servicio asignatura Provider');

  }

  getAll(): Observable<Asignatura[]> {
    let idusuario = ServicioAutenticacion.idusuario;
    let otraurl: string = this.url + "/select";
    var solicitud = {"nombretabla":"asignatura","nombreatributos":["idusuario"],"atributos":{	"idusuario": idusuario}};
    //console.log(solicitud);
    let obj = this.http.post(otraurl, solicitud).
      map(res => res.json() || {}).
      catch(this.processCatch);
    return obj;
  }

  insert(asignatura: Asignatura) {
    let urlcompleta: string = this.url + "/insert/asignatura";
    return this.http.post(urlcompleta, asignatura).map(res => res.json()).catch(this.processCatch);
  }

  delete(idprof: string) {
    var cuerpo = {"nombretabla":"asignatura","nombreatributos":["idasignatura"],"atributos":{	"idasignatura": idprof}};
    let otraurl: string = this.url + "/delete";
    let obj = this.http.post(otraurl, cuerpo).
      map(res => res.json() || {}).
      catch(this.processCatch);
    return obj;
  }

  update(idprof:string, asignatura:Asignatura){
    var cuerpo = {
	    "nombretabla":"asignatura",
  	  "nombreatributos":["idasignatura"],
	    "atributos":{"idasignatura": idprof},
	    "actualizacion":asignatura
    }
    let otraurl: string = this.url + "/update";
    let obj = this.http.post(otraurl, cuerpo).
      map(res => res.json() || {}).
      catch(this.processCatch);
    return obj;
  }

  public processCatch() {
    return Observable.throw(true);
  }

}
