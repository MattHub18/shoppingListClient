import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../../components/toast/toast.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/AppState';
import { ToastController } from '@ionic/angular';
import { LoginPageForm } from './form/login.page.form';
import { LoginState } from '../../store/login/LoginState';
import { PASSWORD_KEY, USERNAME_KEY } from '../../util/constants';
import { login } from 'src/app/store/login/login.actions';
import { writePreference } from '../../store/preferences/preference.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private loginStateSubscription: Subscription;
  private toast: ToastComponent;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    toastController: ToastController
  ) {
    this.loginForm = new LoginPageForm(this.formBuilder).createForm();
    this.toast = new ToastComponent(toastController);
  }

  async ngOnInit() {
    if (!this.loginStateSubscription)
      this.loginStateSubscription = this.store
        .select('login')
        .subscribe((state) => {
          this.onIsLogged(state);
          this.onError(state);
        });
  }

  ngOnDestroy() {
    if (this.loginStateSubscription) this.loginStateSubscription.unsubscribe();
  }

  login() {
    this.store.dispatch(
      login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
      })
    );
  }

  private onIsLogged(state: LoginState) {
    if (state.isLogged) {
      let username = this.loginForm.get('username').value;
      let password = this.loginForm.get('password').value;
      if (username !== '')
        this.store.dispatch(
          writePreference({ key: USERNAME_KEY, value: username })
        );
      if (password !== '')
        this.store.dispatch(
          writePreference({ key: PASSWORD_KEY, value: password })
        );
    }
  }

  private onError(state: LoginState) {
    if (state.error) this.toast.presentToast(state.error);
  }
}
