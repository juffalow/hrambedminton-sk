import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewGameForm from './planGame/Form';
import SEO from '../../components/SEO';
import scheduleGame from '../../mutations/scheduleGame';

const ScheduleGame: React.FC = () => {
  const onSubmit = (values: any) => {
    console.log(values);

    scheduleGame({
      title: values.title,
      place: values.place.name,
      court: values.court,
      type: values.type,
      playedAt: values.playedAt,
      invitation: values.invitation,
    })
    .then((response: any) => {
      console.log(response);
    });
  };

  return (
    <SEO title="Nový zápas" description="">
      <Container>
        <Row>
          <Col>
            <h1>Naplánovať zápas</h1>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <NewGameForm onSubmit={onSubmit} />
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default ScheduleGame;
