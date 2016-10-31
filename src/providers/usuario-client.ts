import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Usuario } from "./usuario";
import { IpServico } from "./ip";

/*
  Generated class for the UsuarioClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsuarioClient {

  //url:string = "http://10.0.2.2:8080/usuarios"; // para el emulador de android
  url: string = "http://" + IpServico.ip + "/general";
  constructor(private http: Http) {
    console.log('Hello UsuarioClient Provider');
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get(this.url).map(res => res.json() || {}).catch(this.processCatch);
  }

  insert(usuario: Usuario) {
    //let urlcompleta:string =this.url+"insert/usuario";  
    return this.http.post(this.url, usuario).map(res => res.json().success).catch(this.processCatch);

  }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post(this.url, { user: usuario, pass: password })
      .map(res => res.json()).catch(this.processCatch);
  }

  public static extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  public processCatch() {
    return Observable.throw(true);
  }

}
