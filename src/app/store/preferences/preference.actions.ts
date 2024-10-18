import {createAction, props} from "@ngrx/store";

/** preferences action **/

export const readPreference = createAction('[readPreference]', props<{preferences:any}>());
export const readPreferenceSuccess = createAction('[readPreference] success', props<{value:any}>());
export const readPreferenceFail = createAction('[readPreference] fail', props<{error:any}>());

export const writePreference = createAction('[writePreference]', props<{key:string, value:string}>());
export const writePreferenceSuccess = createAction('[writePreference] success');
export const writePreferenceFail = createAction('[writePreference] fail', props<{error:any}>());
