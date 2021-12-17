import { GraphQLNonNull } from 'graphql';
import newPlace from '../inputs/place/newPlace';
import { default as PlaceType } from '../types/place';
import Context from '../../context/Context';
import logger from '../../logger';

const createPlace = {
  type: PlaceType,
  args: {
    input: {
      type: GraphQLNonNull(newPlace),
    },
  },
  resolve: async (_, { input }, context: Context): Promise<Place> => {
    logger.debug('CreatePlaceMutation', input);

    const place = await context.repositories.place.create(input);
    
    return place;
  },
};

export default createPlace;
