import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {preferenceReducer} from "./preferences/preference.reducers";
import {PreferenceEffects} from "./preferences/preference.effects";
import {loginReducer} from "./login/login.reducers";
import {LoginEffects} from "./login/login.effects";
import {tokenReducer} from "./token/token.reducers";
import {TokenEffects} from "./token/token.effects";
import {DataEffects} from "./data/data.effects";
import {dataReducer} from "./data/data.reducers";
import {registerReducer} from "./register/register.reducers";
import {RegisterEffects} from "./register/register.effects";

/** add reducers and effects to app **/
export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('preference', preferenceReducer),
  StoreModule.forFeature('login', loginReducer),
  StoreModule.forFeature('token', tokenReducer),
  StoreModule.forFeature('data', dataReducer),
  StoreModule.forFeature('register', registerReducer),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature(PreferenceEffects, LoginEffects, TokenEffects, DataEffects, RegisterEffects)
]
