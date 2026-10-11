import { useActionState } from 'react';
import { Form, InputOTP, Button, Spinner, Alert } from '@heroui/react';
import { useTranslation } from 'react-i18next';

export default function SignInTOTP({
  onSubmit,
}: {
  onSubmit: (prevState: unknown, state: FormData) => Promise<{ totpCode: string; error: string | null }>;
}) {
  const { t } = useTranslation('', { keyPrefix: 'signIn.totp' });
  const [state, formAction, isPending] = useActionState(onSubmit, {
    totpCode: '',
    error: null,
  });

  return (
    <Form action={formAction} className="space-y-6">
      <InputOTP required name="totpCode" maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP>

      {state.error !== null ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Title>{state.error}</Alert.Title>
          </Alert.Content>
        </Alert>
      ) : null}

      <Button type="submit" fullWidth={true} isPending={isPending}>
        {({ isPending }) => (
          <>
            {isPending ? <Spinner color="current" size="sm" /> : null}
            {t('confirmSignInButton')}
          </>
        )}
      </Button>
    </Form>
  );
}
