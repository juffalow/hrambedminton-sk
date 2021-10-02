import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import trainers from '../trainers';

const TrainerDetail: React.FC<Trainer> = (props: Trainer) => (
  <Row className="mb-4 mt-4">
    <Col md={3}>
      <Image src={props.image} thumbnail />
    </Col>
    <Col>
      <h4>{props.name}</h4>
      <div className="mb-1">
        {
          props.cities.map((city) => (
            <>
              <Badge variant="primary">{city}</Badge>{' '}
            </>
          ))
        }
        {
          props.halls.map((hall) => (
            <Badge variant="info">{hall}</Badge>
          ))
        }
      </div>
      <p>e-mail: <a href={`mailto:${props.email}`}>{props.email}</a>, telefón: <a href={`tel:${props.phone.replaceAll(' ', '')}`}>{props.phone}</a></p>
      <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
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
        <Row>
          <Col>
            {
              trainers.map((trainer, index) => (
                <>
                  <TrainerDetail
                    name={`${trainer.firstName} ${trainer.lastName}`}
                    email={trainer.email}
                    phone={trainer.phone}
                    description={trainer.shortDescription}
                    image={trainer.image}
                    cities={trainer.cities}
                    halls={trainer.halls}
                  />
                  {
                    index !== trainers.length - 1 ? (
                      <hr />
                    ) : null
                  }
                </>
              ))
            }
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
