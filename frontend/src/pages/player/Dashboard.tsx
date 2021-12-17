import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SEO from '../../components/SEO';
import BadmintonGame from '../../components/BadmintonGame';
import PlannedGamesContainer from './dashboard/plannedGames/PlannedGamesContainer';

const Dashboard: React.FC = () => {
  return (
    <SEO title="Prehľad" description="">
      <Container>
        <Row>
          <Col>
            <h1>Prehľad</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <PlannedGamesContainer />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h2>Moje odohrane zapasy</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <BadmintonGame />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <BadmintonGame />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <BadmintonGame />
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Dashboard;
