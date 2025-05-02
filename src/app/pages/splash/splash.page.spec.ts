import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SplashPage } from './splash.page';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/AppState';
import { IonicModule, NavController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { preferenceReducer } from 'src/app/store/preferences/preference.reducers';
import { ToastModule } from 'src/app/components/toast/toast.module';
import {
  readPreference,
  readPreferenceFail,
  readPreferenceSuccess,
} from 'src/app/store/preferences/preference.actions';
import { login } from 'src/app/store/login/login.actions';

describe('SplashPage', () => {
  let component: SplashPage;
  let fixture: ComponentFixture<SplashPage>;
  let store: Store<AppState>;
  let navController: NavController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SplashPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('preference', preferenceReducer),
        ToastModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashPage);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    navController = TestBed.inject(NavController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with saved credentials and go to home', () => {
    spyOn(store, 'dispatch');

    fixture.detectChanges();
    store.dispatch(
      readPreference({
        preferences: {
          username_key: 'uname',
          password_key: 'pass',
        },
      })
    );
    store.dispatch(
      readPreferenceSuccess({ value: { uname: 'username', pass: 'password' } })
    );
    store.select('preference').subscribe((preference) => {
      expect(preference.isRead).toBeTruthy();
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      login({ username: 'username', password: 'password' })
    );
  });

  it('should not login with no credentials', () => {
    spyOn(navController, 'navigateRoot');

    fixture.detectChanges();
    store.dispatch(
      readPreference({
        preferences: {
          username_key: 'uname',
          password_key: 'pass',
        },
      })
    );
    store.dispatch(
      readPreferenceSuccess({ value: { uname: undefined, pass: undefined } })
    );
    store.select('preference').subscribe((preference) => {
      expect(preference.isRead).toBeTruthy();
    });
    expect(navController.navigateRoot).toHaveBeenCalledWith(['login']);
  });

  it('should not login with error on read preferences', () => {
    fixture.detectChanges();
    store.dispatch(
      readPreference({
        preferences: {
          some_key: 'uname',
        },
      })
    );
    store.dispatch(readPreferenceFail({ error: 'error' }));
    store.select('preference').subscribe((preference) => {
      expect(preference.isRead).toBeFalsy();
      expect(preference.error).toEqual('error');
    });
  });
});
