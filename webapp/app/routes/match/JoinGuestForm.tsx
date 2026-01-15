import { useActionState } from 'react';
import { Form, Input, Button, Alert, Select, SelectItem } from '@heroui/react';

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

      const result = await addGuestPlayer(guestName, guestEmail, team === '' ? (Math.random() + 1).toString(36).substring(7) : team);

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
    <Form action={formAction} className={`grid grid-cols-1 ${eventType === 'DOUBLES' ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-4 w-full`}>
      <Input
        isRequired
        errorMessage="Toto pole je povinné."
        label="Meno"
        labelPlacement="outside-top"
        name="guestName"
        placeholder="Jozef Novak"
        defaultValue={state.guestName}
        type="text"
      />

      <Input
        isRequired
        errorMessage="Toto pole je povinné."
        label="Email"
        labelPlacement="outside-top"
        name="guestEmail"
        placeholder="jozef.novak@example.com"
        defaultValue={state.guestEmail}
        type="text"
      />

      {eventType === 'DOUBLES' ? (
        <Select label="Spoluhrac" labelPlacement="outside-top" name="team" placeholder="Vyberte spoluhraca">
          {players.map((player) => (
            <SelectItem key={player.team}>{player.name}</SelectItem>
          ))}
        </Select>
      ) : null}

      <Button type="submit" color="primary" fullWidth={true} isLoading={isPending} className="mt-7">
        Pridat sa
      </Button>

      {state.error !== null ? <Alert color="danger" title={state.error} hideIcon={true} /> : null}
    </Form>
  );
}
