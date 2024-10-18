import {AppInitialState} from "../AppInitialState";
import {Action, createReducer, on} from "@ngrx/store";
import {login, loginFail, loginSuccess} from "./login.actions";
import {LoginState} from "./LoginState";

/** login reducers, update state based on action called **/

const initialState:LoginState = AppInitialState.login;

const reducer = createReducer(
  initialState,
  on(login, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(loginSuccess, (currentState) => {
    return {
      ...currentState,
      isLogged: true,
      error:null
    };
  }),
  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      isLogged: false,
      error:action.error
    };
  }),
);

export function loginReducer(state:LoginState, action:Action):LoginState {
  return reducer(state, action);
}
