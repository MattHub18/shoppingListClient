import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {register, registerFail, registerSuccess} from "./register.actions";
import {of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {RegisterService} from "../../services/register/register.service";

@Injectable()
export class RegisterEffects {
  constructor(private actions:Actions, private service:RegisterService) {}

  /** register effects, choose action to call based on service.register() result **/

  $register = createEffect(() => this.actions.pipe(
    ofType(register),
    switchMap((payload:{username:string, password1:string, password2:string, notificationId:string}) => this.service.register(payload.username, payload.password1, payload.password2, payload.notificationId).pipe(
      map(() => registerSuccess()),
      catchError((error) => of(registerFail({error})))
    ))
  ))
}
