import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../../components/toast/toast.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/AppState';
import { LoadingController, ToastController } from '@ionic/angular';
import { LoginPageForm } from './form/login.page.form';
import { LoginState } from '../../store/login/LoginState';
import { PASSWORD_KEY, USERNAME_KEY } from '../../util/constants';
import { login } from 'src/app/store/login/login.actions';
import { writePreference } from '../../store/preferences/preference.actions';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  private loginStateSubscription: Subscription;
  private toast: ToastComponent;
  private loader: LoaderComponent;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.loginForm = new LoginPageForm(this.formBuilder).createForm();
    this.toast = new ToastComponent(toastController);
    this.loader = new LoaderComponent(loadingController);
  }

  ngOnInit() {
    if (!this.loginStateSubscription)
      this.loginStateSubscription = this.store
        .select('login')
        .subscribe((state) => {
          this.onIsLogging(state)
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

  private onIsLogging(state: LoginState) {
    if (state.isLogging) 
      this.loader.showLoader().catch((err) => {
      this.toast.presentToast(err);
    });
  }

  private onIsLogged(state: LoginState) {
    if (state.isLogged) {
      this.loader.hideLoader().catch((err) => {
        this.toast.presentToast(err);
      });
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
    if (state.error){
      this.loader.hideLoader().catch((err) => {
        this.toast.presentToast(err);
      });

      this.toast.presentToast(state.error);
    } 
  }
}
