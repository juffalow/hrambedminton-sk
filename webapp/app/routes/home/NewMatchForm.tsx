import { useActionState } from 'react';
import { Form, Input, Textarea, DatePicker, TimeInput, Button, Alert, Select, SelectItem } from '@heroui/react';
import { useMutation } from 'urql';
import { useNavigate, generatePath } from 'react-router';
import { ROUTES } from '../../constants';

const CreateGuestEventMutation = `
  mutation CreateGuestEvent($input: CreateGuestEventInput!) {
    createGuestEvent(input: $input) {
      id
    }
  }
`;

export default function NewMatchForm() {
  const [createGuestEventResult, createGuestEvent] = useMutation(CreateGuestEventMutation);
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(async (prevState: unknown, state: FormData) => {
    const name = state.get('name') as string;
    const description = state.get('description') as string;
    const eventType = state.get('eventType') as string;
    const maxPlayers = Number(state.get('maxPlayers') as string);
    const date = state.get('date') as string;
    const time = state.get('time') as string;
    const place = state.get('place') as string;
    const court = state.get('court') as string;

    console.log(name, description, maxPlayers, date, time, place, court);
    
    const guestEmail = 'guest@example.com';
    const guestName = 'Guest';

    const result = await createGuestEvent({ input: { name, description, eventType, maxPlayers, date, time, place, court, guestEmail, guestName } });

    console.log(result);

    if (createGuestEventResult.error) {
      return { error: createGuestEventResult.error.message };
    }

    setTimeout(() => navigate(generatePath(`/${ROUTES.sk.prefix}${ROUTES.sk.match}`, { id: result.data.createGuestEvent.id })), 100);

    return { name, description, eventType, maxPlayers, date, time, place, court, error: null };
  }, {
    name: '',
    description: '',
    eventType: '',
    maxPlayers: 0,
    date: '',
    time: '',
    place: '',
    court: '',
    error: null,
  });

  return (
    <Form action={formAction}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="space-y-4">
          <Input
            isRequired
            errorMessage="Toto pole je povinné."
            label="Nazov zapasu"
            labelPlacement="outside-top"
            name="name"
            placeholder="Stvrtkove stvorhry"
            defaultValue={state.name}
            type="text"
          />

          <Select
            isRequired
            errorMessage="Toto pole je povinné."
            label="Typ zapasu"
            labelPlacement="outside-top"
            name="eventType"
            value={state.eventType}
          >
            <SelectItem key="SINGLES">Singles</SelectItem>
            <SelectItem key="DOUBLES">Doubles</SelectItem>
          </Select>

          <Input
            isRequired
            errorMessage="Toto pole je povinné."
            label="Maximalny pocet hracov"
            labelPlacement="outside-top"
            name="maxPlayers"
            placeholder="4"
            defaultValue={String(state.maxPlayers)}
            type="number"
          />

          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              isRequired
              label="Datum zapasu"
              labelPlacement="outside-top"
              name="date"
              defaultValue={null}
            />

            <TimeInput isRequired label="Cas zapasu" labelPlacement="outside-top" name="time" hourCycle={24} />
          </div>

          <Input
            isRequired
            errorMessage="Toto pole je povinné."
            label="Miesto"
            labelPlacement="outside-top"
            name="place"
            placeholder="Slavia Agrofert, NTC, Retro, ..."
            defaultValue={state.place}
            type="text"
          />

          <Input
            isRequired
            errorMessage="Toto pole je povinné."
            label="Kurt(y)"
            labelPlacement="outside-top"
            name="court"
            placeholder="1, 2, 3, ..."
            defaultValue={state.court}
            type="text"
          />
        </div>
        <div>
          <Textarea
            label="Popis zapasu"
            labelPlacement="outside-top"
            name="description"
            placeholder="Popis zapasu"
            defaultValue={state.description}
            minRows={6}
          />
        </div>
      </div>

      {state.error !== null ? <Alert color="danger" title={state.error} hideIcon={true} /> : null}

      <div className="flex justify-center w-full mt-4">
        <Button type="submit" color="primary" size="lg" isLoading={isPending}>
          Vytvorit zapas
        </Button>
      </div>
    </Form>
  );
}
