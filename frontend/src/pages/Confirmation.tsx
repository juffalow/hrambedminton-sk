import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import updatePlayer from '../mutations/updatePlayer';
import { getQueryParameter } from '../utils/functions';

const Confirmation: React.FC = () => {
  const [ status, setStatus ] = useState('loading');

  useEffect(() => {
    const token = getQueryParameter('token');
    const playerId = getQueryParameter('id');

    localStorage.setItem('user-token', token);

    updatePlayer({ id: playerId, isVerified: true })
      .then(() => {
        setStatus('success');
      }).catch(() => {
        setStatus('error');
      });
  }, []);

  return (
    <SEO title="Potvrdenie" description="">
      <Container>
        <Row>
          <Col>
            {
              status === 'success' ? (
                <div>
                  <h1>Potvrdenie registrácie úspešné</h1>
                  <p className="lead">E-mailová adresa bola potvrdená, pokračuj <Link to="/prihlasit-sa">prihlásením sa</Link>.</p>
                </div>
              ) : null
            }
            {
              status === 'error' ? (
                <div>
                  <h1>Potvrdenie registrácie neúspešné</h1>
                  <p className="lead">Nastala chyba pri overovaní e-mailovej adresy. Skús neskôr alebo kontaktuj <Link to="/kontakt">administrátora</Link>.</p>
                </div>
              ) : null
            }
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Confirmation;
