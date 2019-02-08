import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private token: String;

  constructor(private afMessaging: AngularFireMessaging) { }

  async getToken() {
    if (!this.token) {
      await this.afMessaging.requestToken
        .subscribe(
          (token) => {
            // TODO store token on server
            this.token = token;
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  public listenToNotifications(): Observable<any> {
        // Se mettre à l'écoute des notifications
        return this.afMessaging.messages;
  }
}
