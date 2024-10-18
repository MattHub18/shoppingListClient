import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ToastComponent} from "../../components/toast/toast.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/AppState";
import {NavController, ToastController} from "@ionic/angular";
import {LoginPageForm} from "./form/login.page.form";
import {LoginState} from "../../store/login/LoginState";
import {PASSWORD_KEY, USERNAME_KEY} from "../../util/constants";
import {login} from 'src/app/store/login/login.actions';
import {readPreference, writePreference} from "../../store/preferences/preference.actions";
import {PreferenceState} from "../../store/preferences/PreferenceState";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private loginStateSubscription: Subscription;
  private preferenceStateSubscription: Subscription;
  private toast: ToastComponent;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private navController: NavController, toastController: ToastController) {
    this.store.dispatch(readPreference({preferences: {username_key: USERNAME_KEY, password_key: PASSWORD_KEY}}))
    this.loginForm = new LoginPageForm(this.formBuilder).createForm();
    this.toast = new ToastComponent(toastController)
  }

  ngOnInit() {
    if (!this.loginStateSubscription)
      this.loginStateSubscription = this.store.select('login').subscribe(state => {
        this.onIsLogged(state);
        this.onError(state);
      });

    if (!this.preferenceStateSubscription)
      this.preferenceStateSubscription = this.store.select('preference').subscribe(state => {
        this.onIsRead(state)
        this.onError(state);
      });
  }

  ngOnDestroy() {
    if (this.loginStateSubscription)
      this.loginStateSubscription.unsubscribe();

    if (this.preferenceStateSubscription)
      this.preferenceStateSubscription.unsubscribe();
  }

  login() {
    this.store.dispatch(login({
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }))
  }

  private onIsLogged(state: LoginState) {
    if (state.isLogged) {
      this.navController.navigateRoot(['home']).then(result => {
        if (result) {
          let username = this.loginForm.get('username').value;
          let password = this.loginForm.get('password').value;
          if (username !== '')
            this.store.dispatch(writePreference({key: USERNAME_KEY, value: username}));
          if (password !== '')
            this.store.dispatch(writePreference({key: PASSWORD_KEY, value: password}));
        }
      }, (err) => {
        this.toast.presentToast(err)
      });
    }
  }

  private onError(state: LoginState | PreferenceState) {
    if (state.error)
      this.toast.presentToast(state.error)
  }

  private onIsRead(state: PreferenceState) {
    if (state.isRead) {
      let data = state.value
      let usernameObj = data[USERNAME_KEY]
      let passwordObj = data[PASSWORD_KEY]
      let username = usernameObj.value
      let password = passwordObj.value
      if (username && password)
        this.store.dispatch(login({username: username, password: password}))
    }
  }
}
