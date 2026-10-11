import { useActionState } from 'react';
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  DatePicker,
  DateField,
  Calendar,
  TimeField,
  Button,
  Spinner,
  Alert,
  Select,
  ListBox,
} from '@heroui/react';
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
  maxPlayers: z.coerce
    .number()
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
});

const CreateEventMutation = `
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`;

export default function NewMatchForm() {
  const [, createEvent] = useMutation(CreateEventMutation);
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
          error: 'Formulár obsahuje chyby!',
          errors:
            error instanceof ZodError
              ? error.issues.reduce<Record<string, string>>((obj, current) => {
                  obj[current.path[0] as string] = current.message;
                  return obj;
                }, {})
              : {},
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
      });

      // Assume the organizer is in the same time zone as the venue
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const result = await createEvent({
        input: { name, description, eventType, maxPlayers, date, time, timeZone, place, court },
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
      error: null,
      errors: {},
    }
  );

  return (
    <Form action={formAction} validationErrors={state.errors}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="space-y-4">
          <TextField isRequired name="name" defaultValue={state.name} type="text">
            <Label>Názov zápasu</Label>
            <Input placeholder="Štvrtkové štvorhry" />
            <FieldError />
          </TextField>

          <Select isRequired name="eventType" defaultValue={state.eventType || undefined} fullWidth>
            <Label>Typ zápasu</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="SINGLES" textValue="Singles">
                  Singles
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="DOUBLES" textValue="Doubles">
                  Doubles
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
            <FieldError />
          </Select>

          <TextField isRequired name="maxPlayers" defaultValue={String(state.maxPlayers)} type="number">
            <Label>Maximálny počet hráčov</Label>
            <Input placeholder="4" />
            <FieldError />
          </TextField>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DatePicker isRequired name="date">
              <Label>Dátum zápasu</Label>
              <DateField.Group>
                <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                <DateField.Suffix>
                  <DatePicker.Trigger>
                    <DatePicker.TriggerIndicator />
                  </DatePicker.Trigger>
                </DateField.Suffix>
              </DateField.Group>
              <FieldError />
              <DatePicker.Popover>
                <Calendar aria-label="Dátum zápasu">
                  <Calendar.Header>
                    <Calendar.Heading />
                    <Calendar.NavButton slot="previous" />
                    <Calendar.NavButton slot="next" />
                  </Calendar.Header>
                  <Calendar.Grid>
                    <Calendar.GridHeader>
                      {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                  </Calendar.Grid>
                </Calendar>
              </DatePicker.Popover>
            </DatePicker>

            <TimeField isRequired name="time" hourCycle={24}>
              <Label>Čas zápasu</Label>
              <TimeField.Group>
                <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
              </TimeField.Group>
              <FieldError />
            </TimeField>
          </div>

          <TextField isRequired name="place" defaultValue={state.place} type="text">
            <Label>Miesto</Label>
            <Input placeholder="Slávia Agrofert, NTC, Retro, ..." />
            <FieldError />
          </TextField>

          <TextField isRequired name="court" defaultValue={state.court} type="text">
            <Label>Kurt(y)</Label>
            <Input placeholder="1, 2, 3, ..." />
            <FieldError />
          </TextField>
        </div>
      </div>

      <div className="mt-4">
        <TextField name="description" defaultValue={state.description}>
          <Label>Popis zápasu</Label>
          <TextArea placeholder="Popis zápasu" rows={6} />
          <FieldError />
        </TextField>
      </div>

      {state.error !== null ? (
        <Alert status="danger" className="mt-4">
          <Alert.Content>
            <Alert.Title>{state.error}</Alert.Title>
          </Alert.Content>
        </Alert>
      ) : null}

      <div className="flex justify-center w-full mt-4">
        <Button type="submit" size="lg" isPending={isPending}>
          {({ isPending }) => (
            <>
              {isPending ? <Spinner color="current" size="sm" /> : null}
              Vytvoriť zápas
            </>
          )}
        </Button>
      </div>
    </Form>
  );
}
