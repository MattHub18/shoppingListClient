import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {AppState} from "./store/AppState";
import {Store} from "@ngrx/store";
import {ToastComponent} from "./components/toast/toast.component";
import {Subscription} from "rxjs";
import {PreferenceState} from "./store/preferences/PreferenceState";
import {LoginState} from "./store/login/LoginState";
import {tokenValidity} from "./store/token/token.actions";
import {TokenState} from "./store/token/TokenState";

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

  ngOnInit() {
    if (!this.tokenStateSubscription)
      this.tokenStateSubscription = this.store.select('token').subscribe(state => {
        this.checkTokenValidity(state);
        this.onError(state)
      });
  }

  ngOnDestroy() {
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

