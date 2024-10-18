import {Injectable} from '@angular/core';
import {ajax} from "../ajax";
import {jwtDecode} from "jwt-decode";
import {Observable} from "rxjs";
import {BASE_URL} from "../../util/constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;

  private options = {
    url: BASE_URL+"api/v1/token/",
    method: "POST",
    headers: {"Content-Type": "application/json"}
  };

  constructor() {
  }

  /** log in shopping list server, if successes return token, if fails return error **/
  login(username: string, password: string): Observable<void> {
    return new Observable<void>(observer => {
      this.getTokens(username, password).then((tokens) => {
        this.token = tokens;
        observer.next();
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  /** get tokens from shopping list server **/
  private getTokens(username: string, password: string): Promise<any> {
    let settings = {
      ...this.options,
      data: JSON.stringify({
        "username": username,
        "password": password,
      })
    };

    return ajax(settings);
  }

  /** see if token is going to expire, if so, renew it, otherwise return same. If any error occur, return it **/
  checkTokenValidity(): Observable<number> {
    return new Observable<number>(observer => {
      const decodedToken: any = jwtDecode(this.token.access);
      if (decodedToken.exp - new Date().getTime() / 1000 < 0)
        this.refreshAccessToken().then((tokens) => {
          this.token = tokens;
          let decoded = jwtDecode(this.token.access)
          observer.next(decoded.exp - new Date().getTime()/1000);
          observer.complete();
        }, (err) => {
          observer.error(err);
          observer.complete();
        });
      observer.next(decodedToken.exp - new Date().getTime()/1000);
      observer.complete();
    });
  }

  /** renew token **/
  private refreshAccessToken(): Promise<any> {
    let settings = {
      ...this.options,
      "data": JSON.stringify({
        "refresh": this.token.refresh
      })
    };
    return ajax(settings);
  }
}
