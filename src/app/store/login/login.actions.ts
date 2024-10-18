import {createAction, props} from "@ngrx/store";

/** login actions **/
export const login = createAction("[login]", props<{ username: string, password: string }>());
export const loginSuccess = createAction("[login] success");
export const loginFail = createAction("[login] fail", props<{ error: any }>());
