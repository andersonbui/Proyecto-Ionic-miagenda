import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Profesor } from "./profesor";
import { IpServico } from "./ip";
//providers
import { ServicioAutenticacion }  from "../providers/servicio-autenticacion";
/*
  Generated class for the ProfesorClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServicioProfesor {

  url: string = "http://" + IpServico.ip + "/general";

  constructor(private http: Http) {
    console.log('Hola servicio profesor Provider');

  }

  getAll(): Observable<Profesor[]> {
    let idusuario = ServicioAutenticacion.idusuario;
    let otraurl: string = this.url + "/select";
    var solicitud = {"nombretabla":"profesor","nombreatributos":["idusuario"],"atributos":{	"idusuario": idusuario}};
    //console.log(solicitud);
    let obj = this.http.post(otraurl, solicitud).
      map(res => res.json() || {}).
      catch(this.processCatch);
    return obj;
  }

  /*getAll1(): Observable<Profesor[]> {
    let otraurl: string = "http://"+IpServico.ip+"/profesores";
    let obj = this.http.get(otraurl).
      map(res => res.json() || {}).
      catch(this.processCatch);
    //console.log(JSON.stringify(obj));
    return obj;
  }*/

  insert(profesor: Profesor) {
    let urlcompleta: string = this.url + "/insert/profesor";
    return this.http.post(urlcompleta, profesor).map(res => res.json()).catch(this.processCatch);

  }

  delete(idprof: string) {
    var cuerpo = {"nombretabla":"profesor","nombreatributos":["idprofesor"],"atributos":{	"idprofesor": idprof}};
    let otraurl: string = this.url + "/delete";
    let obj = this.http.post(otraurl, cuerpo).
      map(res => res.json() || {}).
      catch(this.processCatch);
    return obj;
  }

  update(idprof:string, profesor:Profesor){
    var cuerpo = {
	    "nombretabla":"profesor",
  	  "nombreatributos":["idprofesor"],
	    "atributos":{"idprofesor": idprof},
	    "actualizacion":profesor
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
