import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ToastComponent} from "../../components/toast/toast.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/AppState";
import {NavController, ToastController} from "@ionic/angular";
import {LoginPageForm} from "./form/login.page.form";
import {LoginState} from "../../store/login/LoginState";
import {NOTIFICATION_KEY, PASSWORD_KEY, USERNAME_KEY} from "../../util/constants";
import { login } from 'src/app/store/login/login.actions';
import {readPreference, writePreference} from "../../store/preferences/preference.actions";
import {PreferenceState} from "../../store/preferences/PreferenceState";
import {DataState} from "../../store/data/DataState";
import {userData} from "../../store/data/data.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm:FormGroup;
  private loginStateSubscription:Subscription;
  private preferenceStateSubscription:Subscription;
  private dataStateSubscription:Subscription;
  private toast:ToastComponent;

  constructor(private formBuilder:FormBuilder, private store:Store<AppState>, private navController:NavController, toastController:ToastController){
    this.loginForm = new LoginPageForm(this.formBuilder).createForm();
    this.toast = new ToastComponent(toastController)
  }

  ngOnInit() {
    if(!this.loginStateSubscription)
      this.loginStateSubscription = this.store.select('login').subscribe(state =>{
        this.onIsLogged(state);
        this.onError(state);
      });

    if(!this.dataStateSubscription)
    this.dataStateSubscription = this.store.select('data').subscribe(state =>{
      this.onIsUserData(state);
      this.onError(state);
    });

    if(!this.preferenceStateSubscription)
      this.preferenceStateSubscription = this.store.select('preference').subscribe(state => {
        this.onIsRead(state)
        this.onError(state);
      });
  }

  ngOnDestroy() {
    if(this.loginStateSubscription)
      this.loginStateSubscription.unsubscribe();

    if(this.preferenceStateSubscription)
      this.preferenceStateSubscription.unsubscribe();
  }

  login(){
    this.store.dispatch(login({username: this.loginForm.get('username').value, password: this.loginForm.get('password').value}))
  }

  private onIsLogged(state: LoginState) {
    if(state.isLogged) {
      this.navController.navigateRoot(['home']).then(result => {
        if(result){
          let username = this.loginForm.get('username').value;
          let password = this.loginForm.get('password').value;
          if(username !== '')
            this.store.dispatch(writePreference({key: USERNAME_KEY, value: username}));
          if(password !== '')
            this.store.dispatch(writePreference({key: PASSWORD_KEY, value: password}));

          this.store.dispatch(readPreference({preferences:{notification_key: NOTIFICATION_KEY}}))
        }
      }, (err) =>{
        this.toast.presentToast(err)
      });
    }
  }

  private onError(state: LoginState|PreferenceState|DataState) {
    if(state.error)
      this.toast.presentToast(state.error)
  }

  private onIsRead(state: PreferenceState) {
    if(state.isRead){
      let data = state.value;
      let notificationObj = data[NOTIFICATION_KEY];
      if(notificationObj) {
        let notificationId = notificationObj.value;
        if(notificationId===null){
          this.store.dispatch(userData())
        }
      }
    }
  }

  private onIsUserData(state: DataState) {
    if(state.isUserData){
      let notificationId = state.data.notificationId;
      this.store.dispatch(writePreference({key: NOTIFICATION_KEY, value: notificationId}))
    }
  }
}
