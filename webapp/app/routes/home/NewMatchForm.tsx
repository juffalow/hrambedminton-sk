import { useActionState } from 'react';
import { Form, Input, Textarea, DatePicker, TimeInput, Button, Alert, Select, SelectItem } from '@heroui/react';
import { useMutation } from 'urql';
import { useNavigate, generatePath } from 'react-router';
import { ROUTES } from '../../constants';
import logger from '../../logger';
import { z, ZodError } from 'zod';

export const newMatchFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Názov zápasu musí mať aspoň 1 znak!' })
    .max(100, { message: 'Názov zápasu môže mať maximálne 100 znakov!' }),
  description: z.string().max(255, { message: 'Popis zápasu môže mať maximálne 255 znakov!' }).optional(),
  eventType: z.enum(['SINGLES', 'DOUBLES']),
  maxPlayers: z
    .coerce.number()
    .min(2, { message: 'Maximálny počet hráčov musí byť aspoň 2!' })
    .max(32, { message: 'Maximálny počet hráčov môže byť maximálne 32!' }),
  date: z.string().min(1).max(10),
  time: z.string().min(1).max(10),
  place: z
    .string()
    .min(1, { message: 'Miesto musí mať aspoň 1 znak!' })
    .max(128, { message: 'Miesto môže mať maximálne 128 znakov!' }),
  court: z
    .string()
    .min(1, { message: 'Kurt(y) musí mať aspoň 1 znak!' })
    .max(64, { message: 'Kurt(y) môže mať maximálne 64 znakov!' }),
  guestName: z
    .string()
    .min(1, { message: 'Meno organizátora musí mať aspo 1 znak!' })
    .max(64, { message: 'Meno organizátora môže mať maximálne 64 znakov!' }),
  guestEmail: z.email({ message: 'Email organizátora musí byť platný email!' }),
});

const CreateGuestEventMutation = `
  mutation CreateGuestEvent($input: CreateGuestEventInput!) {
    createGuestEvent(input: $input) {
      id
    }
  }
`;

export default function NewMatchForm() {
  const [, createGuestEvent] = useMutation(CreateGuestEventMutation);
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(
    async (_: unknown, state: FormData) => {
      const name = state.get('name') as string;
      const description = state.get('description') as string;
      const eventType = state.get('eventType') as string;
      const maxPlayers = Number(state.get('maxPlayers') as string);
      const date = state.get('date') as string;
      const time = state.get('time') as string;
      const place = state.get('place') as string;
      const court = state.get('court') as string;
      const guestName = state.get('guestName') as string;
      const guestEmail = state.get('guestEmail') as string;

      try {
        newMatchFormSchema.parse({
          name,
          description,
          eventType,
          maxPlayers,
          date,
          time,
          place,
          court,
          guestName,
          guestEmail,
        });
      } catch (error: unknown) {
        logger.error('Error validating new match form', { error });

        return {
          name,
          description,
          eventType,
          maxPlayers,
          date,
          time,
          place,
          court,
          guestName,
          guestEmail,
          error: 'Formulár obsahuje chyby!',
          errors:
            error instanceof ZodError
              ? error.issues.reduce<Record<string, string>>((obj, current) => {
                obj[current.path[0] as string] = current.message;
                return obj;
              }, {}) : {},
        };
      }

      logger.info('Creating guest event', {
        name,
        description,
        maxPlayers,
        date,
        time,
        place,
        court,
        guestName,
        guestEmail,
      });

      const result = await createGuestEvent({
        input: { name, description, eventType, maxPlayers, date, time, place, court, guestEmail, guestName },
      });

      if (result.error) {
        logger.error('Error creating guest event', { error: result.error });
        return {
          name,
          description,
          eventType,
          maxPlayers,
          date,
          time,
          place,
          court,
          guestName,
          guestEmail,
          error: result.error.message,
          errors: {},
        };
      }

      setTimeout(
        () => navigate(generatePath(`/${ROUTES.sk.prefix}${ROUTES.sk.match}`, { id: result.data.createGuestEvent.id })),
        100
      );

      return {
        name,
        description,
        eventType,
        maxPlayers,
        date,
        time,
        place,
        court,
        guestName,
        guestEmail,
        error: null,
        errors: {},
      };
    },
    {
      name: '',
      description: '',
      eventType: '',
      maxPlayers: 0,
      date: '',
      time: '',
      place: '',
      court: '',
      guestName: '',
      guestEmail: '',
      error: null,
      errors: {},
    }
  );

  return (
    <Form action={formAction} validationErrors={state.errors}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="space-y-4">
          <Input
            isRequired
            label="Nazov zapasu"
            labelPlacement="outside-top"
            name="name"
            placeholder="Stvrtkove stvorhry"
            defaultValue={state.name}
            type="text"
          />

          <Select
            isRequired
            label="Typ zapasu"
            labelPlacement="outside-top"
            name="eventType"
            selectedKeys={state.eventType ? [state.eventType] : undefined}
          >
            <SelectItem key="SINGLES">Singles</SelectItem>
            <SelectItem key="DOUBLES">Doubles</SelectItem>
          </Select>

          <Input
            isRequired
            label="Maximalny pocet hracov"
            labelPlacement="outside-top"
            name="maxPlayers"
            placeholder="4"
            defaultValue={String(state.maxPlayers)}
            type="number"
          />

          <div className="grid grid-cols-2 gap-4">
            <DatePicker isRequired label="Datum zapasu" labelPlacement="outside-top" name="date" defaultValue={null} />

            <TimeInput isRequired label="Cas zapasu" labelPlacement="outside-top" name="time" hourCycle={24} />
          </div>

          <Input
            isRequired
            label="Miesto"
            labelPlacement="outside-top"
            name="place"
            placeholder="Slavia Agrofert, NTC, Retro, ..."
            defaultValue={state.place}
            type="text"
          />

          <Input
            isRequired
            label="Kurt(y)"
            labelPlacement="outside-top"
            name="court"
            placeholder="1, 2, 3, ..."
            defaultValue={state.court}
            type="text"
          />
        </div>
        <div className="space-y-4">
          <Textarea
            label="Popis zapasu"
            labelPlacement="outside-top"
            name="description"
            placeholder="Popis zapasu"
            defaultValue={state.description}
            minRows={6}
          />

          <Input
            isRequired
            label="Meno organizatora"
            labelPlacement="outside-top"
            name="guestName"
            placeholder="Jozef Novak"
            defaultValue={state.guestName}
            type="text"
          />

          <Input
            isRequired
            label="Email organizatora"
            labelPlacement="outside-top"
            name="guestEmail"
            placeholder="jozef.novak@example.com"
            defaultValue={state.guestEmail}
            type="email"
          />
        </div>
      </div>

      {state.error !== null ? <Alert color="danger" className="mt-4" title={state.error} hideIcon={true} /> : null}

      <div className="flex justify-center w-full mt-4">
        <Button type="submit" color="primary" size="lg" isLoading={isPending}>
          Vytvorit zapas
        </Button>
      </div>
    </Form>
  );
}
