import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PreferenceService} from "../../services/preferences/preference.service";
import {
  readPreference,
  readPreferenceFail,
  readPreferenceSuccess,
  writePreference,
  writePreferenceFail,
  writePreferenceSuccess
} from "./preference.actions";
import {catchError, map, of, switchMap} from "rxjs";

@Injectable()
export class PreferenceEffects {
  constructor(private actions:Actions, private service:PreferenceService) {}

  /** reading preference effects, change state based on service.setStorage() result **/

  $readPreference = createEffect(() => this.actions.pipe(
    ofType(readPreference),
    switchMap((payload:{preferences:any}) => this.service.getStorage(payload.preferences).pipe(
      map((value) => readPreferenceSuccess({value})),
      catchError((error) => of(readPreferenceFail({error})))
    ))
  ))

  /** writing preference effects, change state based on service.getStorage() result **/

  $writePreference = createEffect(() => this.actions.pipe(
    ofType(writePreference),
    switchMap((payload:{key:string, value:string}) => this.service.setStorage(payload.key, payload.value).pipe(
      map(() => writePreferenceSuccess()),
      catchError((error) => of(writePreferenceFail({error})))
    ))
  ))
}
