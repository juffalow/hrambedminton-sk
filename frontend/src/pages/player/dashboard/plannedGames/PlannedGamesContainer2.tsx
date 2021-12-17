import Table from 'react-bootstrap/Table';

const PlannedGamesContainer: React.FC = () => {
  return (
    <Table striped bordered responsive hover>
      <thead>
        <tr>
          <th>Datum</th>
          <th>Miesto</th>
          <th>Nazov</th>
          <th>Hraci</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>15.10.2021 18:30</td>
          <td>Retro</td>
          <td>Ligovy zapas</td>
          <td>Marian Mist, Filip Gajdos, Kundan Kumar</td>
        </tr>
        <tr>
          <td>15.10.2021 18:30</td>
          <td>Retro</td>
          <td>Ligovy zapas</td>
          <td>Marian Mist, Filip Gajdos, Kundan Kumar</td>
        </tr>
        <tr>
          <td>15.10.2021 18:30</td>
          <td>Retro</td>
          <td>Ligovy zapas</td>
          <td>Marian Mist, Filip Gajdos, Kundan Kumar</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default PlannedGamesContainer;
