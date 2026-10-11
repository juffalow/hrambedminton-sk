import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';

const DeleteProfile: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'profile.deleteProfile' });

  return (
    <>
      <p className="mb-4">{t('subtitle')}</p>
      <Button variant="danger-soft" isDisabled>
        {t('submitButton')}
      </Button>
      <p>
        <small>
          {t('clarifyingText')} <a href="mailto:matej.jellus@gmail.com">matej.jellus@gmail.com</a>.
        </small>
      </p>
    </>
  );
};

export default DeleteProfile;
