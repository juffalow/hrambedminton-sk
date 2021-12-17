import context from '../../context';
import logger from '../../logger';

const worker = async (): Promise<{size: number}> => {
    // const params = {
    //   Source: 'no-reply@hrambedminton.sk',
    //   Destination: {
    //     ToAddresses: [
    //       player.email,
    //     ],
    //   },
    //   ReplyToAddresses: [],
    //   Message: {
    //     Body: {
    //       Html: {
    //         Charset: 'UTF-8',
    //         Data: registration('Registrácia | HramBedminton.sk', player.firstName, `https://hrambedminton.sk/hrac/potvrdenie?id=${player.id}&token=${token}`),
    //       },
    //     },
    //     Subject: {
    //       Charset: 'UTF-8',
    //       Data: 'Registrácia | HramBedminton.sk',
    //     }
    //   },
    // };
    
    // return awsSes.sendEmail(params).promise()
    //   .then(() => {
    //     logger.info('Mail sent!', { player });
    //   })
    //   .catch((error) => {
    //     logger.error({ message: error.message, stack: error.stack, player });
    //   });

  return { size: 1 };
};

export default worker;
