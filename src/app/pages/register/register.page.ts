import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../../components/toast/toast.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/AppState';
import { NavController, ToastController } from '@ionic/angular';
import { RegisterPageForm } from './form/register.page.form';

import { register } from '../../store/register/register.actions';
import { PreferenceState } from '../../store/preferences/PreferenceState';
import { RegisterState } from '../../store/register/RegisterState';
import { notification } from 'src/app/store/notification/notification.actions';
import { NotificationState } from 'src/app/store/notification/NotificationState';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private registerStateSubscription: Subscription;
  private notificationStateSubscription: Subscription;
  private toast: ToastComponent;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private navController: NavController,
    toastController: ToastController
  ) {
    this.registerForm = new RegisterPageForm(this.formBuilder).createForm();
    this.toast = new ToastComponent(toastController);
  }

  ngOnInit() {
    if (!this.registerStateSubscription)
      this.registerStateSubscription = this.store
        .select('register')
        .subscribe((state) => {
          this.onIsRegistered(state);
          this.onError(state);
        });

    if (!this.notificationStateSubscription)
      this.notificationStateSubscription = this.store
        .select('notification')
        .subscribe((state) => {
          this.onIsNotification(state);
          this.onError(state);
        });
  }

  ngOnDestroy() {
    if (this.registerStateSubscription)
      this.registerStateSubscription.unsubscribe();
    if (this.notificationStateSubscription)
      this.notificationStateSubscription.unsubscribe();
  }

  register() {
    this.store.dispatch(notification());
    console.log('register');
  }

  private onIsRegistered(state: RegisterState) {
    if (state.isRegistered)
      this.navController.navigateRoot(['login']).catch((err) => {
        this.toast.presentToast(err);
      });
  }

  private onIsNotification(state: NotificationState) {
    if (state.notificationId)
      this.store.dispatch(
        register({
          username: this.registerForm.get('username').value,
          password1: this.registerForm.get('password1').value,
          password2: this.registerForm.get('password2').value,
          notificationId: state.notificationId,
        })
      );
  }

  private onError(state: RegisterState | NotificationState) {
    if (state.error) this.toast.presentToast(state.error);
  }
}
