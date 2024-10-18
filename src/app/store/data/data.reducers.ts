import {AppInitialState} from "../AppInitialState";
import {Action, createReducer, on} from "@ngrx/store";
import {DataState} from "./DataState";
import {
  deleteList,
  deleteListFail,
  deleteListSuccess,
  getList,
  getListFail,
  getListSuccess,
  insertList,
  insertListFail,
  insertListSuccess,
  readList,
  readListFail,
  readListSuccess, removeList, removeListFail, removeListSuccess, userData, userDataFail, userDataSuccess,
  writeList,
  writeListFail,
  writeListSuccess
} from "./data.actions";

/** data reducers, update state based on action called **/

const initialState: DataState = AppInitialState.data;

const reducer = createReducer(
  initialState,
  on(readList, (currentState) => {
    return {
      ...currentState,
      ...initialState,
    };
  }),
  on(readListSuccess, (currentState, action) => {
    return {
      ...currentState,
      isRead: true,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: action.data,
      error: null
    };
  }),
  on(readListFail, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: null,
      error: action.error
    };
  }),
  on(writeList, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(writeListSuccess, (currentState) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: true,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: null,
      error: null
    };
  }),
  on(writeListFail, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: null,
      error: action.error
    };
  }),
  on(deleteList, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(deleteListSuccess, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: true,
      isGot: false,
      isUserData: false,
      data: null,
      error: null
    };
  }),
  on(deleteListFail, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: null,
      error: action.error
    };
  }),
  on(getList, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(getListSuccess, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: true,
      isUserData: false,
      data: action.data,
      error: null
    };
  }),
  on(getListFail, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: null,
      error: action.error
    };
  }),
  on(insertList, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(insertListSuccess, (currentState) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: true,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: null,
      error: null
    };
  }),
  on(insertListFail, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: null,
      error: action.error
    };
  }),
  on(removeList, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(removeListSuccess, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: true,
      isGot: false,
      isUserData: false,
      data: null,
      error: null
    };
  }),
  on(removeListFail, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: null,
      error: action.error
    };
  }),
  on(userData, (currentState) => {
    return {
      ...currentState,
      ...initialState,
    };
  }),
  on(userDataSuccess, (currentState, action) => {
    return {
      ...currentState,
      isRead: true,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      isUserData: true,
      data: action.data,
      error: null
    };
  }),
  on(userDataFail, (currentState, action) => {
    return {
      ...currentState,
      isRead: false,
      isWritten: false,
      isDeleted: false,
      isGot: false,
      isUserData: false,
      data: null,
      error: action.error
    };
  }),
);

export function dataReducer(state: DataState, action: Action): DataState {
  return reducer(state, action);
}
