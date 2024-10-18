import {PreferenceState} from "./preferences/PreferenceState";
import {LoginState} from "./login/LoginState";
import {TokenState} from "./token/TokenState";
import {DataState} from "./data/DataState";
import {RegisterState} from "./register/RegisterState";


/** abstract app state **/
export interface AppState {
  preference: PreferenceState;
  login: LoginState;
  token:TokenState;
  data:DataState;
  register: RegisterState;
}
