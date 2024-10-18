import {Injectable} from '@angular/core';
import {ajax} from "../ajax";
import {jwtDecode} from "jwt-decode";
import {Observable} from "rxjs";
import {BASE_URL} from "../../util/constants";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  token: any;

  private options = {
    url: BASE_URL + "api/v1/register/",
    method: "POST",
    headers: {"Content-Type": "application/json"}
  };

  constructor() {
  }


  register(username: string, password1: string, password2: string, notificationId: string): Observable<void> {
    return new Observable<void>(observer => {
      let settings = {
        ...this.options,
        data: JSON.stringify({username: username, password1: password1, password2: password2, notificationId: notificationId})
      }
      ajax(settings).then((response: any) => {
        observer.next();
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }
}
