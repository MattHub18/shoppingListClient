import {AppInitialState} from "../AppInitialState";
import {Action, createReducer, on} from "@ngrx/store";
import {register, registerFail, registerSuccess} from "./register.actions";
import {RegisterState} from "./RegisterState";

/** login reducers, update state based on action called **/

const initialState:RegisterState = AppInitialState.register;

const reducer = createReducer(
  initialState,
  on(register, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(registerSuccess, (currentState) => {
    return {
      ...currentState,
      isRegistered: true,
      error:null
    };
  }),
  on(registerFail, (currentState, action) => {
    return {
      ...currentState,
      isRegistered: false,
      error:action.error
    };
  }),
);

export function registerReducer(state:RegisterState, action:Action):RegisterState {
  return reducer(state, action);
}
