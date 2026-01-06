import type { FunctionComponent } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import type { Route } from './+types/PrivacyPolicy';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  switch (language) {
    case 'sk':
      return [{ title: 'Zásady ochrany osobných údajov | ClubStats.app' }];
    case 'cz':
      return [{ title: 'Zásady ochrany osobních údajů | ClubStats.app' }];
    case 'de':
      return [{ title: 'Datenschutzrichtlinie | ClubStats.app' }];
    case 'es':
      return [{ title: 'Política de privacidad | ClubStats.app' }];
    case 'fr':
      return [{ title: 'Politique de confidentialité | ClubStats.app' }];
    case 'it':
      return [{ title: 'Informativa sulla privacy | ClubStats.app' }];
    case 'pl':
      return [{ title: 'Polityka prywatności | ClubStats.app' }];
    case 'nl':
      return [{ title: 'Privacybeleid | ClubStats.app' }];
    case 'si':
      return [{ title: 'Politika zasebnosti | ClubStats.app' }];
    case 'fi':
      return [{ title: 'Tietosuojakäytäntö | ClubStats.app' }];
    case 'se':
      return [{ title: 'Integritetspolicy | ClubStats.app' }];
    case 'no':
      return [{ title: 'Personvernerklæring | ClubStats.app' }];
    case 'dk':
      return [{ title: 'Privatlivspolitik | ClubStats.app' }];
    case 'hu':
      return [{ title: 'Adatvédelmi szabályzat | ClubStats.app' }];
    case 'en':
    default:
      return [{ title: 'Privacy Policy | ClubStats.app' }];
  }
}

const PrivacyPolicy: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'privacyPolicy' });

  return (
    <div>
      <h1 className="text-center text-5xl font-bold">{t('title')}</h1>
      <p className="text-gray-500 mt-3 text-xl">{t('subtitle')}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t('firstSection.title')}</h2>
      <p>{t('firstSection.paragraph1')}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t('secondSection.title')}</h2>
      <p>
        <Trans i18nKey="privacyPolicy.secondSection.paragraph1" />
      </p>
      <p>
        <Trans i18nKey="privacyPolicy.secondSection.paragraph2" />
      </p>
      <p>
        <Trans i18nKey="privacyPolicy.secondSection.paragraph3" />
      </p>
      <p>
        <Trans i18nKey="privacyPolicy.secondSection.paragraph4" />
      </p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t('thirdSection.title')}</h2>
      <p>{t('thirdSection.paragraph1')}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t('fourthSection.title')}</h2>
      <p>{t('fourthSection.paragraph1')}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t('fifthSection.title')}</h2>
      <p>{t('fifthSection.paragraph1')}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t('sixthSection.title')}</h2>
      <p>{t('sixthSection.paragraph1')}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t('seventhSection.title')}</h2>
      <p>
        <Trans
          i18nKey="privacyPolicy.seventhSection.paragraph1"
          components={{ mailto: <a href="mailto:matej.jellus@gmail.com" /> }}
        />
      </p>
    </div>
  );
};

export default PrivacyPolicy;
