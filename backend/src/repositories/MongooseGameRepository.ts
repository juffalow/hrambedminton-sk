import GameRepository, { CreateParameters, UpdateParameters, FindParameters, CountParameters } from './GameRepository';
import GameModel from '../models/game';
import { shouldFilterBy } from '../utils/functions';

export default class MongooseGameRepository implements GameRepository {
  public async get(id: string): Promise<Game> {
    const player: any = await GameModel.findOne({ _id: id });

    return player;
  }

  public async create(params: CreateParameters): Promise<Game> {
    const game = new GameModel(params);

    const document: any = await game.save();

    return {
      id: document._id,
      ...document._doc,
    };
  }

  public async update(params: UpdateParameters): Promise<Game> {
    const game = <any> await GameModel.findOneAndUpdate({ _id: params.id }, params, { new: true }).lean();

    return {
      id: game._id,
      ...game._doc,
    };
  }

  public async find(params: FindParameters): Promise<Game[]> {
    const findParameters = {};

    /*
    if (shouldFilterBy(params.firstName)) {
      findParameters['firstName'] = {
        $options: 'i',
        $regex: params.firstName,
      };
    }
    */
    
    const games = await GameModel.find(findParameters).skip(params.offset).limit(params.first);

    return games.map((game: any): Game => ({
      id: game._id,
      ...game._doc,
    }));
  }

  public async count(params: CountParameters): Promise<number> {
    const findParameters = {};

    /*
    if (shouldFilterBy(params.firstName)) {
      findParameters['firstName'] = {
        $options: 'i',
        $regex: params.firstName,
      };
    }
    */
    
    const count = await GameModel.count(findParameters);

    return count;
  }
}