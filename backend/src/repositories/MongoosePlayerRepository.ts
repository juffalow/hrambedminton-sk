import bcrypt from 'bcrypt';
import PlayerRepository, { CreateParameters, UpdateParameters, FindParameters, CountParameters } from './PlayerRepository';
import PlayerModel from '../models/player';
import { shouldFilterBy } from '../utils/functions';

export default class MongoosePlayerRepository implements PlayerRepository {
  public async get(id: string): Promise<Player> {
    const player: any = await PlayerModel.findOne({ _id: id });

    return player;
  }

  public async create(params: CreateParameters): Promise<Player> {
    const password = bcrypt.hashSync(params.password, 10);

    const player = new PlayerModel({
      ...params,
      password,
    });

    const document: any = await player.save();

    return {
      id: document._id,
      ...document._doc,
    };
  }

  public async update(params: UpdateParameters): Promise<Player> {
    const { id, ...data } = params;
    const player = <any> await PlayerModel.findByIdAndUpdate({ _id: id }, data, { new: true }).lean();

    return {
      id: player._id,
      ...player,
    };
  }

  public async find(params: FindParameters): Promise<Player[]> {
    const findParameters = {};

    if (shouldFilterBy(params.firstName)) {
      findParameters['firstName'] = {
        $options: 'i',
        $regex: params.firstName,
      };
    }

    if (shouldFilterBy(params.lastName)) {
      findParameters['lastName'] = {
        $options: 'i',
        $regex: params.lastName,
      };
    }

    if (shouldFilterBy(params.email)) {
      findParameters['email'] = {
        $options: 'i',
        $regex: params.email,
      };
    }
    
    const players = await PlayerModel.find(findParameters).skip(params.offset).limit(params.first);

    return players.map((player: any): Player => ({
      id: player._id,
      ...player._doc,
    }));
  }

  public async count(params: CountParameters): Promise<number> {
    const findParameters = {};

    if (shouldFilterBy(params.firstName)) {
      findParameters['firstName'] = {
        $options: 'i',
        $regex: params.firstName,
      };
    }

    if (shouldFilterBy(params.lastName)) {
      findParameters['lastName'] = {
        $options: 'i',
        $regex: params.lastName,
      };
    }

    if (shouldFilterBy(params.email)) {
      findParameters['email'] = {
        $options: 'i',
        $regex: params.email,
      };
    }
    
    const count = await PlayerModel.count(findParameters);

    return count;
  }
}