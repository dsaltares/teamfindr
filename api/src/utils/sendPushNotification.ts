import WebPush from 'web-push';
import { Config } from '../types';

export interface PushMessage {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  original?: any;
}

const sendPushNotification = (config: Config) => {
  WebPush.setVapidDetails(
    config.clientUrl,
    config.push.publicKey,
    config.push.privateKey
  );

  return (subscription: WebPush.PushSubscription, message: PushMessage) =>
    WebPush.sendNotification(subscription, JSON.stringify(message));
};

export default sendPushNotification;
