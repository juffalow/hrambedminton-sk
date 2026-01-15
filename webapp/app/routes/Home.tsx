import type { Route } from './+types/Home';
import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/button';
import { Link } from 'react-router';
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
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-center mt-10 font-semibold text-xl">Registrovany hrac:</p>
          <div>
            <ul className="list-disc list-inside text-left mt-3 inline-block">
              <li>Moznost vytvarat zapasy</li>
              <li>Historia zapasov</li>
            </ul>
          </div>

          <Button
            as={Link}
            color="primary"
            variant="flat"
            size="lg"
            to={`/${t('prefix', { keyPrefix: 'routes' })}${t('signUp', { keyPrefix: 'routes' })}`}
            className="mt-4"
            data-tracking-id="home_sign_up_click"
          >
            {t('signUpButton')}
          </Button>
        </div>
        <div>
          <p className="text-center mt-10 font-semibold text-xl">Moznosti zapasu:</p>
          <ul className="list-disc list-inside text-center mt-3">
            <li>Zvolit typ zapasu (dvojhra, stvorhra)</li>
            <li>Urcit maximalny pocet hracov</li>
            <li>Zvolit datum a cas zapasu</li>
            <li>Zvolit halu a kurt(y)</li>
            <li>Nastavit cenu zapasu</li>
          </ul>
        </div>
        <div>
          <p className="text-center mt-10 font-semibold text-xl">Vyhody:</p>
          <ul className="list-disc list-inside text-center mt-3">
            <li>Vsetci vidia zoznam hracov</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
