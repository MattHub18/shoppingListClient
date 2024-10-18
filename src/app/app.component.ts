import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {AppState} from "./store/AppState";
import {Store} from "@ngrx/store";
import {ToastComponent} from "./components/toast/toast.component";
import {Subscription} from "rxjs";
import {readPreference} from "./store/preferences/preference.actions";
import {PASSWORD_KEY, USERNAME_KEY} from "./util/constants";
import {PreferenceState} from "./store/preferences/PreferenceState";
import {login} from "./store/login/login.actions";
import {LoginState} from "./store/login/LoginState";
import {tokenValidity} from "./store/token/token.actions";
import {TokenState} from "./store/token/TokenState";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private preferenceStateSubscription: Subscription;
  private loginStateSubscription: Subscription;
  private tokenStateSubscription: Subscription;
  private toast: ToastComponent;

  constructor(private store: Store<AppState>, toastController: ToastController, private router: Router) {
    this.store.dispatch(readPreference({preferences: {username_key:USERNAME_KEY, password_key:PASSWORD_KEY}}))
    this.toast = new ToastComponent(toastController)
  }

  ngOnInit(): void {
    if (!this.preferenceStateSubscription)
      this.preferenceStateSubscription = this.store.select('preference').subscribe(state => {
        this.onReadStorage(state);
        this.onError(state);
      });

    if (!this.loginStateSubscription)
      this.loginStateSubscription = this.store.select('login').subscribe(state => {
        this.onLogin(state)
        this.onError(state)
      });

    if (!this.tokenStateSubscription)
      this.tokenStateSubscription = this.store.select('token').subscribe(state => {
        this.checkTokenValidity(state);
        this.onError(state)
      });
  }

  ngOnDestroy(): void {
    if (this.preferenceStateSubscription)
      this.preferenceStateSubscription.unsubscribe();
  }

  private onReadStorage(state: PreferenceState) {
    if (state.isRead) {
      let data = state.value
      let usernameObj = data[USERNAME_KEY]
      let passwordObj = data[PASSWORD_KEY]
      if(usernameObj && passwordObj) {
        let username = usernameObj.value
        let password = passwordObj.value
        if(username && password)
          this.store.dispatch(login({username: username, password: password}))
      }
    }
  }

  private onLogin(state: LoginState) {
    if (state.isLogged) {
      this.router.navigateByUrl('home').catch(err => {
        this.toast.presentToast(err)
      })
    }
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

