import Table from 'react-bootstrap/Table';
import { createFragmentContainer } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import PlannedGamesRow from './PlannedGamesRow';

interface Props {
  games: Array<Game>;
}

const PlannedGamesTable = (props: Props) => (
  <Table striped bordered responsive hover>
    <thead>
      <tr>
        <th>Dátum</th>
        <th>Miesto</th>
        <th>Názov</th>
        <th>Hráči</th>
      </tr>
    </thead>
    <tbody>
      {
        props.games.map(game => (
          <tr key={game.id} style={{ cursor: 'pointer' }}>
            <PlannedGamesRow game={game} />
          </tr>
        ))
      }
    </tbody>
  </Table>
);

const PlannedGamesTableFragmentContainer = createFragmentContainer(PlannedGamesTable, {
  games: graphql`
    fragment PlannedGamesTable_games on Game @relay(plural: true) {
      id
      ...PlannedGamesRow_game
    }
  `
});

export default PlannedGamesTableFragmentContainer;
