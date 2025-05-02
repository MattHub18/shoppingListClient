import {NotificationState} from "./NotificationState";
import {AppInitialState} from "../AppInitialState";
import {Action, createReducer, on} from "@ngrx/store";
import {notification, notificationFail, notificationSuccess} from "./notification.actions";

/** token validity reducers, update state based on action called **/

const initialState: NotificationState = AppInitialState.notification;

const reducer = createReducer(
  initialState,
  on(notification, (currentState) => {
    return {
      ...currentState,
      ...initialState
    };
  }),
  on(notificationSuccess, (currentState, action) => {
    return {
      ...currentState,
      notificationId: action.notificationId,
      error: null
    };
  }),
  on(notificationFail, (currentState, action) => {
    return {
      ...currentState,
      notificationId: null,
      error: action.error
    };
  }),
);

export function notificationReducer(state: NotificationState, action: Action): NotificationState {
  return reducer(state, action);
}
