import { useActionState } from 'react';
import {
  Form,
  Input,
  Textarea,
  DatePicker,
  TimeInput,
  Button,
  Alert,
  Select,
  SelectItem,
} from '@heroui/react';

export default function NewMatchForm({
  onSubmit,
}: {
  onSubmit: (prevState: unknown, state: FormData) => Promise<{ name: string; description: string; eventType: string; maxPlayers: number; date: string; time: string; place: string; courts: string; error: string | null }>;
}) {
  const [state, formAction, isPending] = useActionState(onSubmit, {
    name: '',
    description: '',
    eventType: '',
    maxPlayers: 0,
    date: '',
    time: '',
    place: '',
    courts: '',
    error: null,
  });

  return (
    <Form action={formAction} className="space-y-4">
      <Input
        isRequired
        errorMessage="Toto pole je povinné."
        label="Nazov zapasu"
        labelPlacement="outside"
        name="name"
        placeholder="Stvrtkove stvorhry"
        defaultValue={state.name}
        type="text"
      />

      <Textarea
        label="Popis zapasu"
        labelPlacement="outside"
        name="description"
        placeholder="Popis zapasu"
        defaultValue={state.description}
        rows={3}
      />

      <Select
        isRequired
        errorMessage="Toto pole je povinné."
        label="Typ zapasu"
        labelPlacement="outside-top"
        name="eventType"
        value={state.eventType}
      >
        <SelectItem key="singles">Singles</SelectItem>
        <SelectItem key="doubles">Doubles</SelectItem>
      </Select>

      <Input
        isRequired
        errorMessage="Toto pole je povinné."
        label="Maximalny pocet hracov"
        labelPlacement="outside"
        name="maxPlayers"
        placeholder="4"
        defaultValue={String(state.maxPlayers)}
        type="number"
      />

      <div className="grid grid-cols-2 gap-4 w-full">
        <DatePicker
          isRequired
          label="Datum zapasu"
          labelPlacement="outside"
          name="date"
          value={state.date as any || null}
        />

        <TimeInput
          isRequired
          label="Cas zapasu"
          labelPlacement="outside"
          name="time"
          hourCycle={24}
        />
      </div>

      <Input
        isRequired
        errorMessage="Toto pole je povinné."
        label="Miesto"
        labelPlacement="outside"
        name="place"
        placeholder="Slavia Agrofert, NTC, Retro, ..."
        defaultValue={state.place}
        type="text"
      />

      <Input
        isRequired
        errorMessage="Toto pole je povinné."
        label="Kurt(y)"
        labelPlacement="outside"
        name="courts"
        placeholder="1, 2, 3, ..."
        defaultValue={state.courts}
        type="text"
      />

      {state.error !== null ? <Alert color="danger" title={state.error} hideIcon={true} /> : null}

      <div className="flex justify-center w-full">
        <Button type="submit" color="primary" size="lg" isLoading={isPending}>
          Vyrtvorit zapas
        </Button>
      </div>
    </Form>
  );
}
