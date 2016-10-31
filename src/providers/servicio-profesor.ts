import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Profesor } from "./profesor";
import { IpServico } from "./ip";

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
    let otraurl: string = this.url + "/select";
    var solicitud = { "nombretabla": "profesor" };
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
    var solicitud = {"nombretabla":"profesor","nombreatributos":["idprofesor"],"atributos":{	"idprofesor": idprof}};
    let otraurl: string = this.url + "/delete";
    //console.log(solicitud);
    let obj = this.http.post(otraurl, solicitud).
      map(res => res.json() || {}).
      catch(this.processCatch);
    return obj;
  }

  login(profesor: string, password: string): Observable<any> {
    return this.http.post(this.url, { user: profesor, pass: password })
      .map(res => res.json()).catch(this.processCatch);
  }

  public processCatch() {
    return Observable.throw(true);
  }

}
