import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputOTP, Label, Button, Alert } from '@heroui/react';
import logger from '../../logger';

interface Props {
  onConfirmSubmit: (code: string) => Promise<void>;
}

const ConfirmForm: FunctionComponent<Props> = ({ onConfirmSubmit }: Props) => {
  const { t } = useTranslation('', { keyPrefix: 'signUp.confirmForm' });

  const onSubmit = async (_: unknown, state: FormData): Promise<{ code: string; error: string | null }> => {
    const code = state.get('code') as string;
    let error = null;

    try {
      await onConfirmSubmit(code);
    } catch (err) {
      logger.error('Unable to confirm sign up!', { error: err });

      if (typeof err === 'object' && err !== null && 'name' in err && err.name === 'CodeMismatchException') {
        error = t('errors.codeMismatch');
      } else {
        error = t('errors.default');
      }
    }

    return { code, error };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, { code: '', error: null });

  return (
    <Form action={formAction} className="space-y-6">
      {state.error !== null ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Description>{state.error}</Alert.Description>
          </Alert.Content>
        </Alert>
      ) : null}

      <div className="flex flex-col gap-1">
        <Label htmlFor="code">{t('code')}</Label>
        <InputOTP id="code" required name="code" maxLength={6}>
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
      </div>

      <Button type="submit" fullWidth={true} isDisabled={isPending}>
        {t('confirmSignUpButton')}
      </Button>
    </Form>
  );
};

export default ConfirmForm;
