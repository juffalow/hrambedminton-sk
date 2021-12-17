import PlaceRepository, { CreateParameters, FindParameters, CountParameters } from './PlaceRepository';
import PlaceModel from '../../models/place';
import { shouldFilterBy } from '../../utils/functions';

export default class MongoosePlaceRepository implements PlaceRepository {
  public async get(id: string): Promise<Place> {
    const place: Place = await PlaceModel.findOne({ _id: id });

    return place;
  }

  public async create(params: CreateParameters): Promise<Place> {
    const place = new PlaceModel(params);

    const document: any = await place.save();

    return {
      id: document._id,
      ...document._doc,
    };
  }

  public async find(params: FindParameters): Promise<Place[]> {
    const findParameters = {};

    if (shouldFilterBy(params.name)) {
      findParameters['name'] = {
        $options: 'i',
        $regex: params.name,
      };
    }
    
    const places = await PlaceModel.find(findParameters).skip(params.offset).limit(params.first);

    return places.map((place: any): Place => ({
      id: place._id,
      ...place._doc,
    }));
  }

  public async count(params: CountParameters): Promise<number> {
    const findParameters = {};

    if (shouldFilterBy(params.name)) {
      findParameters['name'] = {
        $options: 'i',
        $regex: params.name,
      };
    }
    
    const count = await PlaceModel.countDocuments(findParameters);

    return count;
  }
}
