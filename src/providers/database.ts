import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite} from 'ionic-native';
import 'rxjs/add/operator/map';
import {  } from 'ionic/ionic';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
  
  private storage: SQLite;
  private isOpen: boolean;

  constructor(public http: Http) {
    console.log('Hello Database Provider');
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        this.storage.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", []).then(() => {

        }, (err) => {
          console.error('Unable to execute sql: ', err);
        });
        this.isOpen = true;
      });
    }
  }

  public getPeople() {
    return Observable.create(resolve => {
      this.storage.executeSql("SELECT * FROM people", []).then((data) => {
        let people = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            people.push({
              id: data.rows.item(i).id,
              firstname: data.rows.item(i).firstname,
              lastname: data.rows.item(i).lastname
            });
          }
        }
        resolve.next(people);
        resolve.complete();
      });
    });
  }

  public createPerson(firstname: string, lastname: string) {
    return Observable.create(
      observer => {
        this.storage.executeSql("INSERT INTO people (firstname, lastname) VALUES (?, ?)", [firstname, lastname]).then((data) => {
          observer.next(data);
          observer.complete();
        });
      });
  }
  /*public getPeople() {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT windows* FROM people", []).then((data) => {
                let people = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        people.push({
                            id: data.rows.item(i).id,
                            firstname: data.rows.item(i).firstname,
                            lastname: data.rows.item(i).lastname
                        });
                    }
                }
                resolve(people);
            }, (error) => {
                reject(error);
            });
        });
    }
 
    public createPerson(firstname: string, lastname: string) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("INSERT INTO people (firstname, lastname) VALUES (?, ?)", [firstname, lastname]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }*/

}
