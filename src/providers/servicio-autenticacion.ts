import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { IpServico } from "./ip";
//import { Usuario } from "./usuario"; 

//import 'rxjs/add/operator/map';

/*
  Generated class for the ServicioAutenticacion provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServicioAutenticacion {

  url: string = "http://"+IpServico.ip+"/usuarios/login";
  //url: string = "http://localhost:8080/usuarios/login";
  public static idusuario:number = 1;

  constructor(private http: Http) {
    console.log('Se inicio ServicioAutenticacion Provider');
  }

  login(usuario: string, password: string): Observable<any> {
     let result =this.http.post(this.url,{user:usuario,pass:password})
      .map(res => res.json()).catch(this.processCatch);
      return result;
  }
  
  public static extractData(res: Response) {
    let body = res.json();
    return body || {};
  } 

  public processCatch() {
    return Observable.throw(true);
  }
}
