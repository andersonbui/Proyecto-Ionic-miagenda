import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable()
export class LocalService {
    local:Storage;

    constructor(){
        this.local = new Storage();
    }

    setData(key:string, value:any){
        this.local.set(key, value);
    }

    getData(key:string){
        return this.local.get(key);
    }

    

}