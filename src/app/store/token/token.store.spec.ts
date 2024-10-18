import {AppInitialState} from "../AppInitialState";
import {TokenState} from "./TokenState";
import {tokenReducer} from "./token.reducers";
import {tokenValidity, tokenValidityFail, tokenValiditySuccess} from "./token.actions";

describe('token store', ()=>{
  let initialState:TokenState;

  beforeEach(() => {
    initialState = AppInitialState.token;
  });

  it('token validity', ()=>{
    const newState = tokenReducer(initialState, tokenValidity())
    expect(newState).toEqual(initialState)
  });

  it('token validity success', ()=>{
    let expiresIn = 50
    const newState = tokenReducer(initialState, tokenValiditySuccess({expiresIn:expiresIn}))
    expect(newState).toEqual({
      expiresIn:expiresIn,
      error:null
    });
  });

  it('token validity fail', ()=>{
    let error = "error"
    const newState = tokenReducer(initialState, tokenValidityFail({error:error}))
    expect(newState).toEqual({
      expiresIn:0,
      error:error
    });
  });
})
