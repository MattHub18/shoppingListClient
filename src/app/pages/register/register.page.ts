import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ToastComponent} from "../../components/toast/toast.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/AppState";
import {NavController, ToastController} from "@ionic/angular";
import {RegisterPageForm} from "./form/register.page.form";
import {v4 as uuidv4} from 'uuid';
import {readPreference, writePreference} from "../../store/preferences/preference.actions";
import {register} from "../../store/register/register.actions";
import {NOTIFICATION_KEY} from "../../util/constants";
import {PreferenceState} from "../../store/preferences/PreferenceState";
import {RegisterState} from "../../store/register/RegisterState";
import {FCM} from "@capacitor-community/fcm";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private registerStateSubscription: Subscription;
  private preferenceStateSubscription: Subscription;
  private toast: ToastComponent;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private navController: NavController, toastController: ToastController) {
    this.registerForm = new RegisterPageForm(this.formBuilder).createForm();
    this.toast = new ToastComponent(toastController)
  }

  ngOnInit() {
    if (!this.registerStateSubscription)
      this.registerStateSubscription = this.store.select('register').subscribe(state => {
        this.onIsRegistered(state);
        this.onError(state);
      });

    if (!this.preferenceStateSubscription)
      this.preferenceStateSubscription = this.store.select('preference').subscribe(state => {
        this.onReadPreference(state);
        this.onError(state);
      });
  }

  ngOnDestroy() {
    if (this.registerStateSubscription)
      this.registerStateSubscription.unsubscribe();

    if (this.preferenceStateSubscription)
      this.preferenceStateSubscription.unsubscribe();
  }

  register() {
    this.store.dispatch(readPreference({preferences: {notification_key: NOTIFICATION_KEY}}))
  }

  private onReadPreference(state: PreferenceState) {
    if (state.isRead) {
      let data = state.value;
      let notificationObj = data[NOTIFICATION_KEY];
      if(notificationObj){
        let notificationId = notificationObj.value;
        if(notificationId===null){
          notificationId = uuidv4();
          this.store.dispatch(writePreference({key: NOTIFICATION_KEY, value: notificationId}))
          FCM.subscribeTo({topic: notificationId}).catch(err => {
            this.toast.presentToast(err)
          })
        }
        this.store.dispatch(register({
          username: this.registerForm.get('username').value,
          password1: this.registerForm.get('password1').value,
          password2: this.registerForm.get('password2').value,
          notificationId: notificationId
        }))
      }
    }
  }

  private onError(state: RegisterState | PreferenceState) {
    if (state.error)
      this.toast.presentToast(state.error)
  }

  private onIsRegistered(state: RegisterState) {
    if (state.isRegistered)
      this.navController.navigateRoot(['login']).catch(err => {
        this.toast.presentToast(err)
      })
  }
}
