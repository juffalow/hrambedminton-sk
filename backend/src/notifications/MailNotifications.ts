import NotificationInterface from './NotificationsInterface';
import registrationTemplate from './templates/registration';
import newContactMessageTemplate from './templates/newContactMessage';
import logger from '../logger';
import { generateToken } from '../utils/functions';
import context from '../context';

export default class MailNotifications implements NotificationInterface {
  public async newPlayer(player: Player): Promise<void> {
    logger.debug('MailNotifications.newPlayer', { player });
    
    const token = generateToken({ id: player.id, role: 'PLAYER' });

    await context.repositories.mailLog.create({
      fromEmail: 'no-reply@hrambedminton.sk',
      fromName: 'HramBedminton.sk',
      replyToEmail: 'no-reply@hrambedminton.sk',
      replyToName: 'HramBedminton.sk',
      addresses: [ player.email ],
      subject: 'Registrácia | HramBedminton.sk',
      body: registrationTemplate('Registrácia | HramBedminton.sk', player.firstName, `https://hrambedminton.sk/potvrdenie?id=${player.id}&token=${token}`),
    });
  }

  public async newContactMessage(contactMessage: ContactMessage): Promise<void> {
    logger.debug('MailNotifications.newContactMessage', { contactMessage });

    await context.repositories.mailLog.create({
      fromEmail: 'no-reply@hrambedminton.sk',
      fromName: 'HramBedminton.sk',
      replyToEmail: 'no-reply@hrambedminton.sk',
      replyToName: 'HramBedminton.sk',
      addresses: [ 'juffalow@gmail.com' ],
      subject: 'Nová správa | HramBedminton.sk',
      body: newContactMessageTemplate('Nová správa | HramBedminton.sk', contactMessage.name, contactMessage.email, contactMessage.message),
    });
  }

  public async newScheduledGame(): Promise<void> {
    return;
  }
}
