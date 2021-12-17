import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import SEO from '../components/SEO';
import createContactMessage from '../mutations/createContactMessage';

const Contact: React.FC = () => {
  const [ isValidated, setIsValidated ] = useState(false);
  const [ hasError, setHasError ] = useState(false);
  const [ isSent, setIsSent ] = useState(false);
  const [ contactForm, setContactForm ] = useState({
    name: '',
    email: '',
    message: '',
  });

  const onChange = (event: any) => {
    const value: any = {};

    value[event.target.name] = event.target.value;

    setContactForm({
      ...contactForm,
      ...value,
    })
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      createContactMessage(contactForm)
        .then(() => {
          setIsSent(true);
        })
        .catch(() => {
          setHasError(true);
          setIsValidated(false);
        });
    }
  };

  return (
    <SEO title="Kontakt" description="Hrávaš bedminton ale tiež nevieš ako si hral rok dozadu? Ulož si svoje hry a zisti či dosahujes lepšie skóre ako pred tým!">
      <Container>
        <Row>
          <Col>
            <h1>Kontakt</h1>
            <p className="lead">Na tejto stránke (zatiaľ) robím sám vo svojom voľnom čase. Uvítam akúkoľvek pomoc aj vo forme nahlásenia chyby, alebo návrhu na novú funkcionalitu.</p>
            <p>Môžeš ma nájsť na sociálnych sieťach (<a href="https://www.facebook.com/juffalow/" rel="noopener noreferrer" target="_blank">Facebook</a>, <a href="https://www.linkedin.com/in/matej-jellus-34459713a/" rel="noopener noreferrer" target="_blank">LinkedIn</a>), alebo sa za mnou zastaviť priamo na kurte. Isto tu bude každému chýbať niečo iné, ale nájdeme aj veľa spoločných vecí, ktoré nám potom pomôžu lepšie organizovať zápasy a vyhodnocovať naše výsledky.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Napíš mi</h3>
            <p>Ak by si:</p>
            <ul>
              <li>mal akýkoľvek problém s aplikáciou (niečo by nefungovalo)</li>
              <li>mal nápad na novú funkciu</li>
              <li>chcel pomocť či už s programovaním alebo dizajnom</li>
            </ul>
            <p>tak neváhaj a napíš mi!</p>
            {
              hasError ? (
                <Alert variant={'danger'}>Nepodarilo sa odoslať správu!</Alert>
              ) : null
            }
            {
              isSent ? (
                <Alert variant="info">Ďakujem za správu! Odpíšem hneď ako ju prečítam :-)</Alert>
              ) : (
                <Form noValidate validated={isValidated} onSubmit={onSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Meno</Form.Label>
                    <Form.Control required name="name" type="text" placeholder="meno" value={contactForm.name} onChange={onChange} />
                    <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
                  </Form.Group>
    
                  <Form.Group controlId="email">
                    <Form.Label>E-mailová adresa</Form.Label>
                    <Form.Control required name="email" type="email" placeholder="e-mail" value={contactForm.email} onChange={onChange} />
                    <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
                  </Form.Group>
    
                  <Form.Group className="mb-3" controlId="note">
                    <Form.Label>Správa</Form.Label>
                    <Form.Control as="textarea" name="message" placeholder="správa" rows={5} value={contactForm.message} onChange={onChange} />
                  </Form.Group>
    
                  <Button variant="primary" type="submit">
                    Odoslať
                  </Button>
                </Form>
              )
            }
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Contact;
