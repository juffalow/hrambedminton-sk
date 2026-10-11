import type { Route } from './+types/Home';
import { useTranslation } from 'react-i18next';
import { Separator } from '@heroui/react';
import NewMatchForm from './home/NewMatchForm';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  return [
    { title: 'HramBedminton.sk' },
    language === 'sk' && {
      name: 'description',
      content: '',
    },
  ];
}

export function links() {
  return [{ rel: 'alternate', href: 'https://hrambedminton.sk/sk', hrefLang: 'sk' }];
}

export default function Home() {
  const { t } = useTranslation('', { keyPrefix: 'home' });

  return (
    <div>
      <div className="flex justify-center items-center text-center">
        <div className="inline-block">
          <h1 className="text-5xl font-bold">{t('title')}</h1>
        </div>
      </div>
      <p className="text-center text-gray-500 mt-3 text-xl">{t('subtitle')}</p>

      <div className="grid place-items-center">
        <div className="w-full lg:w-3/4 xl:w-2/3 p-4 mt-5">
          <NewMatchForm />
        </div>

        <Separator className="w-full mt-5" />
      </div>
    </div>
  );
}
