import { useEffect, Suspense, useState } from 'react';
import type { Route } from './+types/Profile';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Accordion } from '@heroui/react';
import type { Key } from '@heroui/react';
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

  const onTabChange = (keys: Set<Key>) => {
    if (keys.size === 0) {
      navigate('', { replace: true });
    } else {
      navigate(`#${Array.from(keys)[0]}`, { replace: true });
    }
  };

  return (
    <ErrorBoundary>
      {userPromise ? (
        <Accordion
          onExpandedChange={onTabChange}
          defaultExpandedKeys={window.location.hash.length === 0 ? [] : [window.location.hash.slice(1)]}
        >
          <Accordion.Item id="detail">
            <Accordion.Heading>
              <Accordion.Trigger className="text-xl font-medium">
                {t('detail.title')}
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                <Suspense fallback={<p>Loading detail...</p>}>
                  <Detail getCurrentUserPromise={userPromise as any} />
                </Suspense>
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item id="change-password">
            <Accordion.Heading>
              <Accordion.Trigger className="text-xl font-medium">
                {t('changePassword.title')}
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                <ChangePassword />
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item id="delete-profile">
            <Accordion.Heading>
              <Accordion.Trigger className="text-xl font-medium">
                {t('deleteProfile.title')}
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                <DeleteProfile />
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ) : (
        <ProfileLoader />
      )}
    </ErrorBoundary>
  );
}
