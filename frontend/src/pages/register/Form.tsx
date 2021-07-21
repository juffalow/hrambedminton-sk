import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import createPlayer from '../../mutations/createPlayer';

interface Props {
  onSuccess: (user: any) => void;
}

const RegisterForm: React.FC<Props> = ({ onSuccess }: Props) => {
  const [ isValidated, setIsValidated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ hasError, setHasError ] = useState(false);
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword  ] = useState('');
  const [ confirmPassword, setConfirmPassword  ] = useState('');

  const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      if (password !== confirmPassword) {
        setHasError(true);
        setErrorMessage('Zadané heslá sa nezhodujú!');
        return;
      }
      createPlayer({ firstName, lastName, email, password })
        .then((response: any) => {
          onSuccess(response);
        })
        .catch((error) => {
          setHasError(true);
          if (error.code === 2) {
            setErrorMessage('Užívateľ s touto e-mailovou adresou už existuje!');
          } else {
            setErrorMessage('Nepodarilo sa vytvoriť užívateľa!');
          }
          setIsValidated(false);
        });
    }
  };

  return (
    <>
      {
        hasError ? (
          <Alert variant={'danger'}>
            {errorMessage}
          </Alert>
        ) : null
      }
      <Form noValidate validated={isValidated} onSubmit={onSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>Meno</Form.Label>
          <Form.Control required type="text" placeholder="meno" value={firstName} onChange={onFirstNameChange} />
          <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Priezvisko</Form.Label>
          <Form.Control required type="text" placeholder="priezvisko" value={lastName} onChange={onLastNameChange} />
          <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>E-mailová adresa</Form.Label>
          <Form.Control required type="email" placeholder="e-mail" value={email} onChange={onEmailChange} />
          <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
          <Form.Text className="text-muted">
            Tvoja e-mailová adresa nebude s nikým zdieľaná ani využívaná na marketingové účely.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Heslo</Form.Label>
          <Form.Control required type="password" placeholder="heslo" value={password} onChange={onPasswordChange} />
          <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Zopakuj heslo</Form.Label>
          <Form.Control required type="password" placeholder="to iste heslo" value={confirmPassword} onChange={onConfirmPasswordChange} />
          <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrovať sa
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
