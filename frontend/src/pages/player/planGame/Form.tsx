import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CreatableSelect from 'react-select/async-creatable';
import DatePicker, { registerLocale } from 'react-datepicker';
import sk from "date-fns/locale/sk";
import { formatDate, getSlovakDayName } from '../../../utils/functions';
import { getPlaces } from '../../../api/autocomplete';

registerLocale('sk', sk);

interface PlayerProps {
  number: number;
  name: string;
  email: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

const Player: React.FC<PlayerProps> = (props: PlayerProps) => (
  <Card className="mt-4">
    <Card.Header>{props.number}. hráč <Button size="sm" variant="danger" className="float-right">-</Button></Card.Header>
    <Card.Body>
      <Form.Row>
        <Col>
          <Form.Group className="mb-3" controlId={`player${props.number}Name`}>
            <Form.Label>Meno a priezvisko</Form.Label>
            <Form.Control type="text" placeholder="meno a priezvisko" value={props.name} onChange={(event) => props.onNameChange(event.target.value)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId={`player${props.number}Email`}>
            <Form.Label>E-mail <small>(nepovinné)</small></Form.Label>
            <Form.Control type="text" placeholder="@" value={props.email} onChange={(event) => props.onEmailChange(event.target.value)} />
          </Form.Group>
        </Col>
      </Form.Row>
    </Card.Body>
  </Card>
);

interface NewGameFormProps {
  onSubmit: (values: any) => void;
}

const NewGame: React.FC<NewGameFormProps> = (props: NewGameFormProps) => {
  const [ isValidated, setIsValidated ] = useState(false);
  const [ values, setValues ] = useState({
    title: '',
    place: {
      id: null,
      name: '',
    },
    court: '',
    type: '',
    invitation: `Ahoj,\n\npoďme si zahrať bedminton utorok ${formatDate(new Date(), 'dd.MM.YYYY')} o 12:00.\n\nS pozdravom\nMatej`,
    date: new Date(),
    time: '12:00',
    players: [
      {
        name: '',
        email: '',
      },
    ],
    hasNoteChange: false,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    updateInvitation();
  };

  const updateInvitation = () => {
    setValues((prevValues: any) => {
      if (prevValues.hasNoteChange === false) {
        return {
          ...prevValues,
          invitation: `Ahoj,\n\npoďme si zahrať bedminton ${getSlovakDayName(prevValues.date.getDay())} ${formatDate(prevValues.date, 'dd.MM.YYYY')} v ${prevValues.place} o ${prevValues.time} kurt ${prevValues.court}.\n\nS pozdravom\nMatej`,
        };
      }
      return prevValues;
    });
  }

  const onDateChange = (date: Date) => {
    setValues({
      ...values,
      date,
    });

    updateInvitation();
  }

  const onPlaceChange = (option: any) => {
    setValues({
      ...values,
      place: {
        id: option.value,
        name: option.label,
      },
    });
  }

  const onPlayerNameChnage = (index: number, name: string) => {
    const players = values.players;
    players[index].name = name;

    setValues({
      ...values,
      players,
    });
  }

  const onPlayerEmailChnage = (index: number, email: string) => {
    const players = values.players;
    players[index].email = email;

    setValues({
      ...values,
      players,
    });
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsValidated(true);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      props.onSubmit({ ...values, playedAt: `${formatDate(values.date, 'YYYY-MM-dd')} ${values.time}:00` });
    }
  };

  return (
    <Form noValidate validated={isValidated} onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Názov</Form.Label>
        <Form.Control type="text" placeholder="" name="title" value={values.title} onChange={handleChange} />
      </Form.Group>
      <Form.Row>
        <Col>
          <Form.Group className="mb-3" controlId="place">
            <Form.Label>Miesto</Form.Label>
            <CreatableSelect
              cacheOptions
              isClearable={true}
              loadOptions={getPlaces}
              value={{ value: values.place.id, label: values.place.name }}
              placeholder="vyber miesto"
              onChange={onPlaceChange}
              onCreateOption={() => { console.log("onCreateOption") }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="court">
            <Form.Label>Kurt</Form.Label>
            <Form.Control type="text" placeholder="kurt na ktorom sa bude hrať" name="court" value={values.court} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="4" className="mb-3" controlId="date">
          <Form.Label>Dátum</Form.Label>
          <DatePicker
            dateFormat="dd.MM.yyyy"
            customInput={<Form.Control type="text" name="date" placeholder="datum a cas" />}
            locale="sk"
            selected={values.date}
            onChange={onDateChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="2" className="mb-3" controlId="date">
          <Form.Label>Cas</Form.Label>
          <Form.Control as="select" name="time" value={values.time} onChange={handleChange} required>
            <option value="00:00">00:00</option>
            <option value="00:30">00:30</option>
            <option value="01:00">01:00</option>
            <option value="01:30">01:30</option>
            <option value="02:00">02:00</option>
            <option value="02:30">02:30</option>
            <option value="03:00">03:00</option>
            <option value="03:30">03:30</option>
            <option value="04:00">04:00</option>
            <option value="04:30">04:30</option>
            <option value="05:00">05:00</option>
            <option value="05:30">05:30</option>
            <option value="06:00">06:00</option>
            <option value="06:30">06:30</option>
            <option value="07:00">07:00</option>
            <option value="07:30">07:30</option>
            <option value="08:00">08:00</option>
            <option value="08:30">08:30</option>
            <option value="09:00">09:00</option>
            <option value="09:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15:00">15:00</option>
            <option value="15:30">15:30</option>
            <option value="16:00">16:00</option>
            <option value="16:30">16:30</option>
            <option value="17:00">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22:00">22:00</option>
            <option value="22:30">22:30</option>
            <option value="23:00">23:00</option>
            <option value="23:30">23:30</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="type">
          <Form.Label>Typ</Form.Label>
          <Form.Control as="select" name="type" value={values.type} onChange={handleChange} required>
            <option>vyber jednu možnosť...</option>
            <option value="SINGLES">Dvojhra</option>
            <option value="DOUBLES">Štvorhra</option>
            <option value="MIX">Mix</option>
            <option value="OTHER">Iné</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Player
        number={1}
        name={values.players[0].name}
        email={values.players[0].email}
        onNameChange={(value) => onPlayerNameChnage(0, value)}
        onEmailChange={(value) => onPlayerEmailChnage(0, value)}
      />

      <div className="text-center mt-4 mb-4">
        <Button variant="outline-success" size="sm">Pridať hráča</Button>
      </div>

      <Form.Group className="mb-3" controlId="note">
        <Form.Label>Pozvánka</Form.Label>
        <Form.Control as="textarea" placeholder="pozvánka" value={values.invitation} onChange={handleChange} rows={6} />
        <Form.Text className="text-muted">
          Tento text bude odoslaný na tvoj e-mail a e-mail pozvaných hráčov.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Odoslať hráčom pozvánku na e-mail" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Uložiť
      </Button>
    </Form>
  );
}

export default NewGame;
