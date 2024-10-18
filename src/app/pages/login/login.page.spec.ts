import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { LoginPage } from './login.page';
import {Store, StoreModule} from "@ngrx/store";
import {AppState} from "../../store/AppState";
import {IonicModule, NavController} from "@ionic/angular";
import {AppRoutingModule} from "../../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputErrorMessageModule} from "../../components/input-error-message/input-error-message.module";
import {ToastModule} from "../../components/toast/toast.module";
import {loginReducer} from "../../store/login/login.reducers";
import {login, loginFail, loginSuccess} from "../../store/login/login.actions";

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let store:Store<AppState>;
  let navController:NavController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, InputErrorMessageModule, StoreModule.forRoot([]), StoreModule.forFeature("login", loginReducer), ToastModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    navController = TestBed.inject(NavController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with right credentials and go to home', () =>{
    spyOn(navController, 'navigateRoot')

    fixture.detectChanges()
    store.dispatch(login({username: 'myUsername', password: 'myPassword'}))
    store.dispatch(loginSuccess());
    store.select('login').subscribe((login)=>{
      expect(login.isLogged).toBeTruthy();
    })

    expect(navController.navigateRoot).toHaveBeenCalledWith(['home']);
  })

  it('should not login with wrong username', () =>{
    fixture.detectChanges()
    store.dispatch(login({username: 'notMyUsername', password: 'myPassword'}))
    store.dispatch(loginFail({error: "error"}));
    store.select('login').subscribe((login)=>{
      expect(login.isLogged).toBeFalsy();
      expect(login.error).toEqual("error");
    })
  })

  it('should not login with wrong password', () =>{
    fixture.detectChanges()
    store.dispatch(login({username: 'myUsername', password: 'notMyPassword'}))
    store.dispatch(loginFail({error: "error"}));
    store.select('login').subscribe((login)=>{
      expect(login.isLogged).toBeFalsy();
      expect(login.error).toEqual("error");
    })
  })
});

