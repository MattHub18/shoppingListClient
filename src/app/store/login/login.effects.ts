import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth/auth.service";
import {login, loginFail, loginSuccess} from "./login.actions";
import {of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";

@Injectable()
export class LoginEffects{
  constructor(private actions:Actions, private service:AuthService) {}

  /** login effects, choose action to call based on service.login() result **/

  $login = createEffect(() => this.actions.pipe(
    ofType(login),
    switchMap((payload:{username:string, password:string}) => this.service.login(payload.username, payload.password).pipe(
      map(() => loginSuccess()),
      catchError((error) => of(loginFail({error})))
    ))
  ))
}
