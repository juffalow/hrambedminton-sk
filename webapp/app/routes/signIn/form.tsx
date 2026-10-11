import { useActionState } from 'react';
import { Form, TextField, Label, Input, FieldError, Button, Spinner, Alert } from '@heroui/react';
import { useTranslation } from 'react-i18next';

export default function SignInForm({
  onSubmit,
}: {
  onSubmit: (prevState: unknown, state: FormData) => Promise<{ email: string; password: string; error: string | null }>;
}) {
  const { t } = useTranslation('', { keyPrefix: 'signIn.form' });
  const [state, formAction, isPending] = useActionState(onSubmit, {
    email: '',
    password: '',
    error: null,
  });

  return (
    <Form action={formAction} className="space-y-6">
      <TextField
        isRequired
        name="email"
        defaultValue={state.email}
        type="text"
        autoComplete="email"
        className="autofill:!bg-yellow-200"
      >
        <Label>{t('email')}</Label>
        <Input placeholder={t('emailPlaceholder')} />
        <FieldError>{t('requiredField')}</FieldError>
      </TextField>

      <TextField
        isRequired
        name="password"
        defaultValue={state.password}
        type="password"
        autoComplete="current-password"
      >
        <Label>{t('password')}</Label>
        <Input placeholder={t('passwordPlaceholder')} />
        <FieldError>{t('requiredField')}</FieldError>
      </TextField>

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
            {t('signInButton')}
          </>
        )}
      </Button>
    </Form>
  );
}
