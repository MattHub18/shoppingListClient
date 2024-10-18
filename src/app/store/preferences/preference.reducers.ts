import {AppInitialState} from "../AppInitialState";
import {PreferenceState} from "./PreferenceState";
import {Action, createReducer, on} from "@ngrx/store";
import {
  readPreference,
  readPreferenceFail,
  readPreferenceSuccess,
  writePreference,
  writePreferenceFail,
  writePreferenceSuccess
} from "./preference.actions";

/** preference reducers, update state based on action called **/

const initialState:PreferenceState = AppInitialState.preference;

const reducer = createReducer(
  initialState,
  on(readPreference, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(readPreferenceSuccess, (currentState, action) => {
    return {
      ...currentState,
      isRead:true,
      isWritten:false,
      value:action.value,
      error:null,
    };
  }),
  on(readPreferenceFail, (currentState, action) => {
    return {
      ...currentState,
      isRead:false,
      isWritten:false,
      value:null,
      error:action.error,
    };
  }),
  on(writePreference, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(writePreferenceSuccess, (currentState) => {
    return {
      isRead:false,
      isWritten:true,
      value:null,
      error:null,
    };
  }),
  on(writePreferenceFail, (currentState, action) => {
    return {
      ...currentState,
      isRead:false,
      isWritten:false,
      value:null,
      error:action.error,
    };
  }),

);

export function preferenceReducer(state:PreferenceState, action:Action):PreferenceState {
  return reducer(state, action);
}
