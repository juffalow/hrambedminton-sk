import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegisterForm from './register/Form';
import ThankYou from './register/ThankYou';
import SEO from '../components/SEO';

const Register: React.FC = () => {
  const [ isSuccess, setIsSuccess ] = useState(false);

  const onSuccess = () => {
    setIsSuccess(true);
  }

  return (
    <SEO title="Registrácia" description="">
      <Container className="main" style={{ marginTop: 50 }}>
        <Row>
          <Col>
            <h1>Registrácia</h1>
            <p className="lead">Vytvor si účet a sleduj svoj progress! Ulož si poznámky k hráčom, plánuj zápasy s leduj ako hrajú tvoji kamaráti.</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            {
              isSuccess ? (
                <ThankYou />
              ) : (
                <RegisterForm onSuccess={onSuccess} />
              )
            }
          </Col>
        </Row>
      </Container>
    </SEO>
  );
};

export default Register;
