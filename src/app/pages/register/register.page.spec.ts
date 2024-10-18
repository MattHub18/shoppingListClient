import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Store, StoreModule} from "@ngrx/store";
import {AppState} from "../../store/AppState";
import {IonicModule, NavController} from "@ionic/angular";
import {AppRoutingModule} from "../../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputErrorMessageModule} from "../../components/input-error-message/input-error-message.module";
import {ToastModule} from "../../components/toast/toast.module";
import {RegisterPage} from "./register.page";
import {register, registerFail, registerSuccess} from "../../store/register/register.actions";
import {registerReducer} from "../../store/register/register.reducers";

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let store:Store<AppState>;
  let navController:NavController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, InputErrorMessageModule, StoreModule.forRoot([]), StoreModule.forFeature("register", registerReducer), ToastModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    navController = TestBed.inject(NavController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register with right credentials and go to login', () =>{
    spyOn(navController, 'navigateRoot')

    fixture.detectChanges()
    store.dispatch(register({username: 'myUsername', password1: 'myPassword', password2: 'myPassword', notificationId: '123'}))
    store.dispatch(registerSuccess());
    store.select('register').subscribe((register)=>{
      expect(register.isRegistered).toBeTruthy();
    })

    expect(navController.navigateRoot).toHaveBeenCalledWith(['login']);
  })

  it('should not register with wrong password', () =>{
    fixture.detectChanges()
    store.dispatch(register({username: 'myUsername', password1: 'notMyPassword', password2: 'myPassword', notificationId: '123'}))
    store.dispatch(registerFail({error: "error"}));
    store.select('register').subscribe((register)=>{
      expect(register.isRegistered).toBeFalsy();
      expect(register.error).toEqual("error");
    })
  })
});

