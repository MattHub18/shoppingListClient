import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {notification, notificationFail, notificationSuccess} from "./notification.actions";
import { NotificationService } from "src/app/services/notification/notification.service";

@Injectable()
export class NotificationEffects{
  constructor(private actions:Actions, private service:NotificationService) {}

  /** notification validity effects, choose action to call based on service.subscribeToTopic() result **/

  $token = createEffect(() => this.actions.pipe(
    ofType(notification),
    switchMap(() => this.service.subscribeToTopic().pipe(
      map((notificationId) => notificationSuccess({notificationId})),
      catchError((error) => of(notificationFail({error})))
    ))
  ))
}
