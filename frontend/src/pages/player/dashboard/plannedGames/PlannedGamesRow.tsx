import { createFragmentContainer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { formatDate } from '../../../../utils/functions';

interface Props {
  game: Game;
}

const PlannedGamesRow = (props: Props) => (
  <>
    <td>{formatDate(new Date(props.game.playedAt), 'dd.MM.YYYY HH:mm')}</td>
    <td>{props.game.place}, kurt {props.game.court}</td>
    <td>{props.game.title}</td>
    <td></td>
  </>
);

const PlannedGamesRowFragmentContainer = createFragmentContainer(PlannedGamesRow, {
  game: graphql`
     fragment PlannedGamesRow_game on Game {
        _id
        title
        place
        court
        playedAt
     }
  `
});

export default PlannedGamesRowFragmentContainer;
