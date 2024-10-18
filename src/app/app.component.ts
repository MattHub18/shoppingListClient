import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController, ToastController} from "@ionic/angular";
import {AppState} from "./store/AppState";
import {Store} from "@ngrx/store";
import {ToastComponent} from "./components/toast/toast.component";
import {Subscription} from "rxjs";
import {readPreference} from "./store/preferences/preference.actions";
import {PASSWORD_KEY, USERNAME_KEY} from "./util/constants";
import {PreferenceState} from "./store/preferences/PreferenceState";
import {LoginState} from "./store/login/LoginState";
import {tokenValidity} from "./store/token/token.actions";
import {TokenState} from "./store/token/TokenState";
import {login} from "./store/login/login.actions";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private tokenStateSubscription: Subscription;
  private toast: ToastComponent;

  constructor(private store: Store<AppState>, toastController: ToastController) {
    this.toast = new ToastComponent(toastController)
  }

  ngOnInit(): void {
    if (!this.tokenStateSubscription)
      this.tokenStateSubscription = this.store.select('token').subscribe(state => {
        this.checkTokenValidity(state);
        this.onError(state)
      });
  }

  ngOnDestroy(): void {
    if (this.tokenStateSubscription)
      this.tokenStateSubscription.unsubscribe();
  }

  private checkTokenValidity(state: TokenState) {
    let expiresIn = state.expiresIn;
    if (expiresIn > 0)
      setTimeout(() => {
        this.store.dispatch(tokenValidity());
      }, expiresIn*1000)
  }

  private onError(state: PreferenceState | LoginState | TokenState) {
    if (state.error)
      this.toast.presentToast(state.error)
  }
}

