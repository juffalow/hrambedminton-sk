import ContactMessageRepository, { CreateParameters } from './ContactMessageRepository';
import ContactMessageModel from '../../models/contactMessage';

export default class MongooseGameRepository implements ContactMessageRepository {
  public async get(id: string): Promise<ContactMessage> {
    const contactMessage: any = await ContactMessageModel.findOne({ _id: id });

    return contactMessage;
  }

  public async create(params: CreateParameters): Promise<ContactMessage> {
    const contactMessage = new ContactMessageModel(params);

    const document: any = await contactMessage.save();

    console.log(document._doc);

    return {
      id: document._id,
      ...document._doc,
    };
  }
}
