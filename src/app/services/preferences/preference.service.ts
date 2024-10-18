import {Injectable} from '@angular/core';
import {Preferences} from "@capacitor/preferences";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor() {
  }

  /** write on mobile's preferences **/
  setStorage(key: string, value: any): Observable<void> {
    return new Observable<void>(subscriber => {
      Preferences.set({key: key, value: value}).then(() => {
        subscriber.next();
        subscriber.complete();
      }, error => {
        subscriber.error(error);
      });
    })
  }

  /** read mobile's preferences **/
  getStorage(preferences: any): Observable<any> {
    return new Observable<any>(subscriber => {
      let promises:any = []

      Object.keys(preferences).forEach((key)=>{
        promises.push(Preferences.get({key: preferences[key]}))
      });

      Promise.all(promises).then((results) => {
        let result:any = {}
        Object.keys(preferences).forEach((key, index)=>{
          result = {...result, [preferences[key]]: results[index]}
        });

        subscriber.next(result);
        subscriber.complete();
      }, (err) => {
        subscriber.error(err);
        subscriber.complete();
      })
    })
  }
}
