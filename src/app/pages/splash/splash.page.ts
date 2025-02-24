import { Component, OnDestroy, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { AppState } from 'src/app/store/AppState';
import { login } from 'src/app/store/login/login.actions';
import { readPreference } from 'src/app/store/preferences/preference.actions';
import { PreferenceState } from 'src/app/store/preferences/PreferenceState';
import { PASSWORD_KEY, USERNAME_KEY } from 'src/app/util/constants';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit, OnDestroy {
  private preferenceStateSubscription: Subscription;
  private toast: ToastComponent;

  constructor(
    private store: Store<AppState>,
    toastController: ToastController,
    private navController: NavController
  ) {
    this.toast = new ToastComponent(toastController);
  }

  async ngOnInit() {
    await SplashScreen.hide();
    SplashScreen.show({
      autoHide: false,
    }).then(() => {
      this.store.dispatch(
        readPreference({
          preferences: {
            username_key: USERNAME_KEY,
            password_key: PASSWORD_KEY,
          },
        })
      );
    });

    if (!this.preferenceStateSubscription)
      this.preferenceStateSubscription = this.store
        .select('preference')
        .subscribe((state) => {
          this.onIsRead(state);
          this.onError(state);
        });
  }

  ngOnDestroy() {
    if (this.preferenceStateSubscription)
      this.preferenceStateSubscription.unsubscribe();
  }

  private onError(state: PreferenceState) {
    if (state.error) this.toast.presentToast(state.error);
  }

  private async onIsRead(state: PreferenceState) {
    if (state.isRead) {
      let data = state.value;
      let usernameObj = data[USERNAME_KEY];
      let passwordObj = data[PASSWORD_KEY];
      let username = usernameObj.value;
      let password = passwordObj.value;
      if (username && password) {
        this.store.dispatch(login({ username: username, password: password }));
      } else{
        this.navController.navigateRoot(['login']).then(()=>{
          SplashScreen.hide();
        })
      }
    }
  }
}
