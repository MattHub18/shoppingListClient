import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ajax} from "../ajax";
import {BASE_URL} from "../../util/constants";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private listBaseUrl = BASE_URL + "api/v1/shopping/"
  private itemBaseUrl = BASE_URL + "api/v1/item/"

  constructor(private authService: AuthService) {
  }

  list(): Observable<any> {
    return new Observable((observer) => {
      let settings = {
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + this.authService.token.access
        },
        url: this.listBaseUrl + 'get/',
        method: 'GET',
      }
      ajax(settings).then((response) => {
        observer.next(response.data);
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  create(datetime: string): Observable<null> {
    return new Observable((observer) => {
      let settings = {
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + this.authService.token.access
        },
        url: this.listBaseUrl + 'create/',
        method: 'POST',
        data: JSON.stringify({createdAt: datetime})
      }
      ajax(settings).then((response) => {
        observer.next();
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  delete(id: number): Observable<null> {
    return new Observable((observer) => {
      let settings = {
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + this.authService.token.access
        },
        url: this.listBaseUrl + 'delete/' + id + '/',
        method: 'DELETE'
      }
      ajax(settings).then((response) => {
        observer.next();
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  retrieve(id: number): Observable<any> {
    return new Observable((observer) => {
      let settings = {
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + this.authService.token.access
        },
        url: this.listBaseUrl + 'retrieve/' + id + '/',
        method: 'GET',
      }
      ajax(settings).then((response) => {
        observer.next({data: response.data, id: id});
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  insert(item: any): Observable<null> {
    return new Observable((observer) => {
      let settings = {
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + this.authService.token.access
        },
        url: this.itemBaseUrl + 'create/',
        method: 'POST',
        data: JSON.stringify({isle: item.isle, name: item.name, shoppingListId: item.shoppingListId})
      }
      ajax(settings).then((response) => {
        observer.next();
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  remove(id: number): Observable<null> {
    return new Observable((observer) => {
      let settings = {
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + this.authService.token.access
        },
        url: this.itemBaseUrl + 'delete/' + id + '/',
        method: 'DELETE'
      }
      ajax(settings).then((response) => {
        observer.next();
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  userData(): Observable<any> {
    return new Observable((observer) => {
      let settings = {
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + this.authService.token.access
        },
        url: BASE_URL + 'api/v1/userdata/',
        method: 'GET'
      }
      ajax(settings).then((response) => {
        observer.next(response.data);
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }
}
