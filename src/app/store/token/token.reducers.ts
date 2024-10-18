import {TokenState} from "./TokenState";
import {AppInitialState} from "../AppInitialState";
import {Action, createReducer, on} from "@ngrx/store";
import {tokenValidity, tokenValidityFail, tokenValiditySuccess} from "./token.actions";

/** token validity reducers, update state based on action called **/

const initialState: TokenState = AppInitialState.token;

const reducer = createReducer(
  initialState,
  on(tokenValidity, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(tokenValiditySuccess, (currentState, action) => {
    return {
      ...currentState,
      expiresIn: action.expiresIn,
      error: null
    };
  }),
  on(tokenValidityFail, (currentState, action) => {
    return {
      ...currentState,
      expiresIn: 0,
      error: action.error
    };
  }),
);

export function tokenReducer(state: TokenState, action: Action): TokenState {
  return reducer(state, action);
}
