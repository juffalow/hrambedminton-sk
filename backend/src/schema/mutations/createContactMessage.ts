import { GraphQLNonNull } from 'graphql';
import newContactMessage from '../inputs/newContactMessage';
import { default as ContactMessageType } from '../types/contactMessage';
import Context from '../../context/Context';
import logger from '../../logger';

const createContactMessage = {
  type: ContactMessageType,
  args: {
    input: {
      type: GraphQLNonNull(newContactMessage),
    },
  },
  resolve: async (_, { input }, context: Context): Promise<ContactMessage> => {
    logger.debug('CreateContactMessageMutation', input);

    const contactMessage = await context.repositories.contactMessage.create(input);

    await context.notifications.newContactMessage(contactMessage);
    
    return contactMessage;
  },
};

export default createContactMessage;
