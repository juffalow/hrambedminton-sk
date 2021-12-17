import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import SEO from '../../components/SEO';

interface PlayerProps {
  number: number;
}

const Player: React.FC<PlayerProps> = (props: PlayerProps) => (
  <Card className="mt-4">
    <Card.Header>{props.number}. hrac <Button size="sm" variant="danger" className="float-right">-</Button></Card.Header>
    <Card.Body>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId={`player${props.number}FirstName`}>
            <Form.Label>Meno</Form.Label>
            <Form.Control type="text" placeholder="meno" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId={`player${props.number}LastName`}>
            <Form.Label>Priezvisko</Form.Label>
            <Form.Control type="text" placeholder="priezvisko" />
          </Form.Group>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

interface GameSetProps {
  number: number;
  type: 'singles' |'doubles' | 'mix';
}


const GameSet: React.FC<GameSetProps> = (props: GameSetProps) => (
  <Card className="mt-4">
    <Card.Header>{props.number}. set <Button size="sm" variant="danger" className="float-right">-</Button></Card.Header>
    <Card.Body>
      <Row>
        <Col>
          <h5>Team 1</h5>
          <Form.Group className="mb-3" controlId="playerId">
            <Form.Label>Hráč</Form.Label>
            <Form.Control type="text" placeholder="meno hraca" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="team1Score">
            <Form.Label>Skóre</Form.Label>
            <Form.Control type="text" placeholder="skóre" />
          </Form.Group>
        </Col>
        <Col>
          <h5>Team 2</h5>
          <Form.Group className="mb-3" controlId="playerId">
            <Form.Label>Hráč</Form.Label>
            <Form.Control type="text" placeholder="meno hraca" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="team1Score">
            <Form.Label>Skóre</Form.Label>
            <Form.Control type="text" placeholder="skóre" />
          </Form.Group>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

const NewGame: React.FC = () => {
  return (
    <SEO title="Nový zápas" description="">
      <Container>
        <Row>
          <Col>
            <h1>Nový zápas</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="place">
                <Form.Label>Miesto</Form.Label>
                <Form.Control type="text" placeholder="miesto" />
                <Form.Text className="text-muted">
                  Kde sa odohrával zápas.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Dátum a čas</Form.Label>
                <Form.Control type="text" placeholder="datum" />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Typ</Form.Label>
                <Form.Control as="select" required>
                  <option>vyber jednu možnosť...</option>
                  <option value="singles">Dvojhra</option>
                  <option value="doubles">Štvorhra</option>
                  <option value="mix">Mix</option>
                  <option value="other">Iné</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="note">
                <Form.Label>Poznámka</Form.Label>
                <Form.Control as="textarea" placeholder="poznámka" />
              </Form.Group>

              <h4>Hráči</h4>

              <Player number={1} />

              <div className="text-center mt-4 mb-4">
                <Button variant="outline-success" size="sm">Pridať hraca</Button>
              </div>

              <h4>Sety</h4>

              <GameSet number={1} type={'singles'} />

              <GameSet number={2} type={'singles'} />

              <div className="text-center mt-4 mb-4">
                <Button variant="outline-success" size="sm">Pridať set</Button>
              </div>

              <Button variant="primary" type="submit">
                Uložiť
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default NewGame;
