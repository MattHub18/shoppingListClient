import {createAction, props} from "@ngrx/store";

/** token validity actions **/
export const tokenValidity = createAction("[tokenValidity]");
export const tokenValiditySuccess = createAction("[tokenValidity] success", props<{ expiresIn: number }>());
export const tokenValidityFail = createAction("[tokenValidity] fail", props<{ error: any }>());
