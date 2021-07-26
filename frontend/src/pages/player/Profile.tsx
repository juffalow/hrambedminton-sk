import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SEO from '../../components/SEO';

const Profile: React.FC = () => {
  return (
    <SEO title="" description="Profil uzivatela">
      <Container>
        <Row>
          <Col>
            <h1>Meno Priezvisko</h1>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Profile;
