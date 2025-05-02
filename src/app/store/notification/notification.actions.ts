import {createAction, props} from "@ngrx/store";

/** notification validity actions **/
export const notification = createAction("[notification]");
export const notificationSuccess = createAction("[notification] success", props<{ notificationId: any }>());
export const notificationFail = createAction("[notification] fail", props<{ error: any }>());
