import {AppInitialState} from "../AppInitialState";
import {LoginState} from "./LoginState";
import {loginReducer} from "./login.reducers";
import {login, loginFail, loginSuccess} from "./login.actions";

describe('login store', ()=>{
  let initialState:LoginState;

  beforeEach(() => {
     initialState = AppInitialState.login;
  });

  it('login', ()=>{
    const newState = loginReducer(initialState, login({username:"username", password:"password"}))
    expect(newState).toEqual(initialState)
  });

  it('login success', ()=>{
    const newState = loginReducer(initialState, loginSuccess())
    expect(newState).toEqual({
      isLogged:true,
      error:null
    });
  });

  it('login fail', ()=>{
    const newState = loginReducer(initialState, loginFail({error:"error"}))
    expect(newState).toEqual({
      isLogged:false,
      error:"error"
    });
  });
})
