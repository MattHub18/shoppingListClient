import { Router } from '@angular/router';
import {inject} from "@angular/core";
import {of, take} from "rxjs";
import {switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/AppState";

/** functional guards: check if user is authenticated and authorize page access, otherwise redirect to login**/

export const authGuard = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  return store.select('login').pipe(
    take(1),
    switchMap(loginState => {
      if (loginState.isLogged)
        return of(true);
      router.navigateByUrl('/');
      return of(false);
    })
  );
}
