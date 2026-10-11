import { use } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, TextField, Label, Input } from '@heroui/react';

interface Props {
  getCurrentUserPromise: Promise<User>;
}

const Detail: FunctionComponent<Props> = ({ getCurrentUserPromise }: Props) => {
  const { t } = useTranslation('', { keyPrefix: 'profile.detail' });
  const user = use(getCurrentUserPromise);

  return (
    <Form>
      <TextField name="email" defaultValue={user.email} type="text" isReadOnly>
        <Label>{t('email')}</Label>
        <Input />
      </TextField>
    </Form>
  );
};

export default Detail;
