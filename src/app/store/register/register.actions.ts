import {createAction, props} from "@ngrx/store";

/** register actions **/
export const register = createAction("[register]", props<{ username: string, password1: string, password2:string, notificationId:string }>());
export const registerSuccess = createAction("[register] success");
export const registerFail = createAction("[register] fail", props<{ error: any }>());
