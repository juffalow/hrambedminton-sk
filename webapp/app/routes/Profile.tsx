import { useEffect, Suspense, useState } from 'react';
import type { Route } from './+types/Profile';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Accordion, AccordionItem } from '@heroui/accordion';
import ProfileLoader from './profile/loader';
import Detail from './profile/detail';
import ChangePassword from './profile/changePassword';
import DeleteProfile from './profile/deleteProfile';
import ErrorBoundary from '../components/ErrorBoundary';
import useAuth from '../hooks/useAuth';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  switch (language) {
    case 'sk':
    default:
      return [{ title: 'Profil | HramBedminton.sk' }];
  }
}

export default function Profile() {
  const { t } = useTranslation('', { keyPrefix: 'profile' });
  const { getUser } = useAuth();
  const navigate = useNavigate();
  const [userPromise, setUserPromise] = useState<Promise<User | null> | null>(null);

  useEffect(() => {
    if (userPromise !== null) {
      return;
    }

    setUserPromise(getUser());
  }, [getUser]);

  const onTabChange = (keys: 'all' | Set<React.Key>) => {
    if (keys instanceof Set && keys.size === 0) {
      navigate('', { replace: true });
    } else {
      navigate(`#${Array.from(keys)[0]}`, { replace: true });
    }
  };

  return (
    <ErrorBoundary>
      {userPromise ? (
        <Accordion
          keepContentMounted={true}
          onSelectionChange={onTabChange}
          defaultSelectedKeys={window.location.hash.length === 0 ? [] : [window.location.hash.slice(1)]}
        >
          <AccordionItem
            key="detail"
            aria-label={t('detail.title')}
            title={t('detail.title')}
            classNames={{ title: 'text-xl font-medium' }}
            href="#detail"
          >
            <Suspense fallback={<p>Loading detail...</p>}>
              <Detail getCurrentUserPromise={userPromise as any} />
            </Suspense>
          </AccordionItem>
          <AccordionItem
            key="change-password"
            aria-label={t('changePassword.title')}
            title={t('changePassword.title')}
            classNames={{ title: 'text-xl font-medium' }}
          >
            <ChangePassword />
          </AccordionItem>
          <AccordionItem
            key="delete-profile"
            aria-label={t('deleteProfile.title')}
            title={t('deleteProfile.title')}
            classNames={{ title: 'text-xl font-medium' }}
          >
            <DeleteProfile />
          </AccordionItem>
        </Accordion>
      ) : (
        <ProfileLoader />
      )}
    </ErrorBoundary>
  );
}
