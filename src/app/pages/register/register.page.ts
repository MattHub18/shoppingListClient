import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../../components/toast/toast.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/AppState';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { RegisterPageForm } from './form/register.page.form';

import { register } from '../../store/register/register.actions';
import { RegisterState } from '../../store/register/RegisterState';
import { notification } from 'src/app/store/notification/notification.actions';
import { NotificationState } from 'src/app/store/notification/NotificationState';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

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
  private loader: LoaderComponent;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private navController: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.registerForm = new RegisterPageForm(this.formBuilder).createForm();
    this.toast = new ToastComponent(toastController);
    this.loader = new LoaderComponent(loadingController);
  }

  ngOnInit() {
    if (!this.registerStateSubscription)
      this.registerStateSubscription = this.store
        .select('register')
        .subscribe((state) => {
          this.onIsRegistering(state);
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

  private onIsRegistering(state: RegisterState) {
    if (state.isRegistering)
      this.loader.showLoader().catch((err) => {
        this.toast.presentToast(err);
      })
  }

  private onIsRegistered(state: RegisterState) {
    if (state.isRegistered){
      this.loader.hideLoader().catch((err) => {
        this.toast.presentToast(err);
      })

      this.navController.navigateRoot(['login']).catch((err) => {
        this.toast.presentToast(err);
      });
    }
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
      if (state.error){
        this.loader.hideLoader().catch((err) => {
          this.toast.presentToast(err);
        });
  
        this.toast.presentToast(state.error);
      } 
    }
}
