import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const TrainerDetail: React.FC<Trainer> = (props: Trainer) => (
  <Row>
    <Col md={3}>
      <Image src="https://www.badmintonland.sk/images/trener.png" thumbnail />
    </Col>
    <Col>
      <h4>{props.name}</h4>
      <p>e-mail: <a href={`mailto:${props.email}`}>{props.email}</a>, telefón: <a href={`tel:${props.phone.replaceAll(' ', '')}`}>{props.phone}</a></p>
      <p>{props.description}</p>
    </Col>
  </Row>
);

const Trainers: React.FC = () => {
  return (
    <SEO title="Tréneri" description="Vyber si trénera a zlepši svoju hru! V zozname si môžeš vyhľadať trénera podľa mesta ale aj podľa haly, kde by si chcel trénovať.">
      <Container>
        <Row>
          <Col>
            <h1>Tréneri</h1>
            <p className="lead">Vyber si trénera a zlepši svoju hru! V zozname si môžeš vyhľadať trénera podľa mesta ale aj podľa haly, kde by si chcel trénovať.</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <TrainerDetail
              name="Martin Schön"
              email="badmintonland@badmintonland.sk"
              phone="+421 903 900 570"
              description="Profesionálny kouč, tréner s licenciou."
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p>Chýbaš v zozname trénerov? Napíš mi správu (<Link to="/kontakt">kontakt</Link>) a pošli mi základné údaje ako meno, e-mail, telefón, fotku a popis.</p>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Trainers;
