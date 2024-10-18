import {PreferenceState} from "./PreferenceState";
import {AppInitialState} from "../AppInitialState";
import {preferenceReducer} from "./preference.reducers";
import {
  readPreference,
  readPreferenceFail,
  readPreferenceSuccess,
  writePreference,
  writePreferenceFail,
  writePreferenceSuccess
} from "./preference.actions";

describe('preference STORE', ()=>{
  let initialState:PreferenceState;

  beforeEach(() => {
    initialState = AppInitialState.preference;
  });

  it('retrieve preference', ()=> {
    const newState = preferenceReducer(initialState, readPreference({key: "key"}))
    expect(newState).toEqual(initialState);
  });

  it('retrieve preference success', ()=>{
    const value = "value";
    const newState = preferenceReducer(initialState, readPreferenceSuccess({value:value}));
    expect(newState).toEqual({
      isRead:true,
      isWritten:false,
      value:value,
      error:null,
      }
    );
  });

  it('retrieve preference fail', ()=>{
    const error = "error";
    const newState = preferenceReducer(initialState, readPreferenceFail({error:error}));
    expect(newState).toEqual({
        isRead:false,
        isWritten:false,
        value:null,
        error:error,
      }
    );
  });

  it('set preference', ()=>{
    const newState = preferenceReducer(initialState, writePreference({key:"key", value:"value"}))
    expect(newState).toEqual(initialState)
  });

  it('set preference success', ()=>{
    const newState = preferenceReducer(initialState, writePreferenceSuccess());
    expect(newState).toEqual({
        isRead:false,
        isWritten:true,
        value:null,
        error:null,
      }
    );
  });

  it('set preference fail', ()=>{
    const error = "error";
    const newState = preferenceReducer(initialState, writePreferenceFail({error:error}));
    expect(newState).toEqual({
        isRead:false,
        isWritten:false,
        value:null,
        error:error,
      }
    );
  });
})
