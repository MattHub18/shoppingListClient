import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth/auth.service";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {tokenValidity, tokenValidityFail, tokenValiditySuccess} from "./token.actions";

@Injectable()
export class TokenEffects{
  constructor(private actions:Actions, private service:AuthService) {}

  /** token validity effects, choose action to call based on service.checkTokenValidity() result **/

  $token = createEffect(() => this.actions.pipe(
    ofType(tokenValidity),
    switchMap(() => this.service.checkTokenValidity().pipe(
      map((expiresIn) => tokenValiditySuccess({expiresIn})),
      catchError((error) => of(tokenValidityFail({error})))
    ))
  ))
}
