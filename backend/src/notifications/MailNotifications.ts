import sgMail from '@sendgrid/mail';
import NotificationInterface from './NotificationsInterface';
import registration from './templates/registration';
import config from '../config';
import logger from '../logger';
import { generateToken } from '../utils/functions';

export default class MailNotifications implements NotificationInterface {

  constructor() {
    sgMail.setApiKey(config.mail.sendgrid.apiKey);
  }

  public async newPlayer(player: Player): Promise<void> {
    const token = generateToken({ id: player.id, role: 'PLAYER' });
    const message = {
      to: player.email,
      from: 'bedminton@juffalow.com',
      subject: 'Registrácia | HramBedminton.sk',
      html: registration('Registrácia | HramBedminton.sk', player.firstName, `https://hrambedminton.sk/hrac/potvrdenie?id=${player.id}&token=${token}`),
    };

    return sgMail.send(message)
      .then(() => {
        logger.info('Mail sent!', { player });
      })
      .catch((error) => {
        logger.error({ message: error.message, stack: error.stack, player });
      });
  }
}
