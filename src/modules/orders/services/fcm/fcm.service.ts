import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from 'assets/applacarta-firebase-admin.json';
import { messaging } from 'firebase-admin/lib/messaging';

@Injectable()
export class FcmService {
  messaging: messaging.Messaging;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    });

    this.messaging = admin.messaging();
  }

  async sendMessage() {
    const message = {
      topic: 'asdasdadsa',
    };

    const resut = await this.messaging.send(message);
    console.log(resut);
    return resut;
  }
}
