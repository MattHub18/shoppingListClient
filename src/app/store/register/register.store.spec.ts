import {AppInitialState} from "../AppInitialState";
import {RegisterState} from "./RegisterState";
import {registerReducer} from "./register.reducers";
import {register, registerFail, registerSuccess} from "./register.actions";

describe('register store', ()=>{
  let initialState:RegisterState;

  beforeEach(() => {
     initialState = AppInitialState.register;
  });

  it('login', ()=>{
    const newState = registerReducer(initialState, register({username:"username", password1:"password", password2:"password", notificationId:"notificationId"}))
    expect(newState).toEqual(initialState)
  });

  it('register success', ()=>{
    const newState = registerReducer(initialState, registerSuccess())
    expect(newState).toEqual({
      isRegistered:true,
      error:null
    });
  });

  it('login fail', ()=>{
    const newState = registerReducer(initialState, registerFail({error:"error"}))
    expect(newState).toEqual({
      isRegistered:false,
      error:"error"
    });
  });
})
