import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { linkVariants } from '@heroui/react';

export default function ThankYou() {
  const { t } = useTranslation('', { keyPrefix: 'signUp.thankYou' });

  return (
    <p className="text-center">
      {t('subtitle')}{' '}
      <RouterLink
        className={linkVariants().base()}
        to={`/${t('prefix', { keyPrefix: 'routes' })}${t('signIn', { keyPrefix: 'routes' })}`}
      >
        {t('subtitleLink')}
      </RouterLink>
      .
    </p>
  );
}
