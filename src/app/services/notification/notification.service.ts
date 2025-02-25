import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FCM } from '@capacitor-community/fcm';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  subscribeToTopic(): Observable<any> {
    return new Observable((observer) => {
      let notificationId = uuidv4();
      FCM.subscribeTo({ topic: notificationId })
        .then(() => {
          observer.next(notificationId);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }
}
