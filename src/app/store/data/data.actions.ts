import {createAction, props} from "@ngrx/store";

/** data actions **/
export const readList = createAction("[read]");
export const readListSuccess = createAction("[read] success", props<{ data:any }>());
export const readListFail = createAction("[read] fail", props<{ error: any }>());

export const writeList = createAction("[write]", props<{ datetime:string }>());
export const writeListSuccess = createAction("[write] success");
export const writeListFail = createAction("[write] fail", props<{ error: any }>());

export const deleteList = createAction("[delete]", props<{ id:number }>());
export const deleteListSuccess = createAction("[delete] success");
export const deleteListFail = createAction("[delete] fail", props<{ error: any }>());

export const getList = createAction("[get]", props<{ id:number }>());
export const getListSuccess = createAction("[get] success", props<{ data:any }>());
export const getListFail = createAction("[get] fail", props<{ error: any }>());

export const insertList = createAction("[insert]", props<{ item:any }>());
export const insertListSuccess = createAction("[insert] success");
export const insertListFail = createAction("[insert] fail", props<{ error: any }>());

export const removeList = createAction("[remove]", props<{ id:number }>());
export const removeListSuccess = createAction("[remove] success");
export const removeListFail = createAction("[remove] fail", props<{ error: any }>());
