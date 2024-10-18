import {AppState} from "./AppState";

/** concrete and initialized app state **/
export const AppInitialState: AppState = {
  preference: {
    isRead:false,
    isWritten:false,
    value:null,
    error:null,
  },
  login:{
    isLogged:false,
    error:null
  },
  register:{
    isRegistered:false,
    error:null
  },
  token:{
    expiresIn:0,
    error:null
  },
  data:{
    isRead:false,
    isWritten:false,
    isDeleted:false,
    isGot:false,
    data:null,
    error:null
  }
}
