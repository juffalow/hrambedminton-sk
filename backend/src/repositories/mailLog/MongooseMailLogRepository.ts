import MailLogRepository, { CreateParameters, FindParameters, CountParameters } from './MailLogRepository';
import MailLogModel from '../../models/mailLog';
import { shouldFilterBy } from '../../utils/functions';

export default class MongooseGameRepository implements MailLogRepository {
  public async create(params: CreateParameters): Promise<MailLog> {

    const mailLog = new MailLogModel(params);

    const document: any = await mailLog.save();

    return {
      id: document._id,
      ...document._doc,
    };
  }

  public async find(params: FindParameters): Promise<MailLog[]> {
    const findParameters = {};

    if (shouldFilterBy(params.address)) {
      findParameters['addresses'] = {
        $options: 'i',
        $regex: params.address,
      };
    }

    if (shouldFilterBy(params.subject)) {
      findParameters['subject'] = {
        $options: 'i',
        $regex: params.subject,
      };
    }
    
    const places = await MailLogModel.find(findParameters).skip(params.offset).limit(params.first);

    return places.map((place: any): Place => ({
      id: place._id,
      ...place._doc,
    }));
  }

  public async count(params: CountParameters): Promise<number> {
    const findParameters = {};

    if (shouldFilterBy(params.address)) {
      findParameters['addresses'] = {
        $options: 'i',
        $regex: params.address,
      };
    }

    if (shouldFilterBy(params.subject)) {
      findParameters['subject'] = {
        $options: 'i',
        $regex: params.subject,
      };
    }
    
    const count = await MailLogModel.countDocuments(findParameters);

    return count;
  }
}
