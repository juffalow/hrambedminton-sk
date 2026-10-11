import { useActionState } from 'react';
import { Form, TextField, Label, Input, FieldError, Button, Spinner, Alert, Select, ListBox } from '@heroui/react';

interface Props {
  eventType: 'SINGLES' | 'DOUBLES';
  players: {
    name: string;
    team: string;
  }[];
  addGuestPlayer: (guestName: string, guestEmail: string, team: string) => Promise<unknown>;
}

export default function JoinGuestForm({ eventType, players, addGuestPlayer }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (_: unknown, state: FormData) => {
      const guestName = state.get('guestName') as string;
      const guestEmail = state.get('guestEmail') as string;
      const team = state.get('team') as string;

      console.log('Adding guest player', { guestName, guestEmail, team });

      const result = await addGuestPlayer(
        guestName,
        guestEmail,
        team === '' ? (Math.random() + 1).toString(36).substring(7) : team
      );

      console.log(result);

      if (
        typeof result === 'object' &&
        result !== null &&
        'error' in result &&
        typeof result.error === 'object' &&
        result.error !== null &&
        'message' in result.error &&
        typeof result.error.message === 'string'
      ) {
        return { error: result.error.message };
      }

      return { guestName, guestEmail, team, error: null };
    },
    {
      guestName: '',
      guestEmail: '',
      team: '',
      error: null,
    }
  );

  return (
    <Form
      action={formAction}
      className={`grid grid-cols-1 ${eventType === 'DOUBLES' ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-4 w-full`}
    >
      <TextField isRequired name="guestName" defaultValue={state.guestName} type="text">
        <Label>Meno</Label>
        <Input placeholder="Jozef Novak" />
        <FieldError>Toto pole je povinné.</FieldError>
      </TextField>

      <TextField isRequired name="guestEmail" defaultValue={state.guestEmail} type="text">
        <Label>Email</Label>
        <Input placeholder="jozef.novak@example.com" />
        <FieldError>Toto pole je povinné.</FieldError>
      </TextField>

      {eventType === 'DOUBLES' ? (
        <Select name="team" placeholder="Vyberte spoluhráča" fullWidth>
          <Label>Spoluhráč</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {players.map((player) => (
                <ListBox.Item key={player.team} id={player.team} textValue={player.name}>
                  {player.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      ) : null}

      <Button type="submit" fullWidth={true} isPending={isPending} className="mt-7">
        {({ isPending }) => (
          <>
            {isPending ? <Spinner color="current" size="sm" /> : null}
            Pridať sa
          </>
        )}
      </Button>

      {state.error !== null ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Title>{state.error}</Alert.Title>
          </Alert.Content>
        </Alert>
      ) : null}
    </Form>
  );
}
