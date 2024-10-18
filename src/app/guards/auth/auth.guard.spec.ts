import { TestBed } from '@angular/core/testing';
import {Observable} from "rxjs";
import {authGuard} from "./auth.guard";
import {Store, StoreModule} from "@ngrx/store";
import {AppState} from "../../store/AppState";
import {loginSuccess} from "../../store/login/login.actions";
import {loginReducer} from "../../store/login/login.reducers";
import {Router, RouterModule} from "@angular/router";

describe('AuthGuard', () => {
  let guard: Observable<boolean>
  let store:Store<AppState>
  let router:Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
       StoreModule.forRoot([]),
       StoreModule.forFeature('login', loginReducer)
      ]
    }).compileComponents();
    guard = TestBed.runInInjectionContext(authGuard);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should allow logged user to access Home Page', () => {
    store.dispatch(loginSuccess());
    guard.subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    });
  });

  it('should not allow unlogged user to access Home Page', () => {
    guard.subscribe(isAllowed => {
      expect(isAllowed).toBeFalsy();
    });
  });

  it('should allow unlogged user to go to Login Page', () => {
    spyOn(router, 'navigateByUrl');
    guard.subscribe(isAllowed => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });
});
