import { useState, useCallback } from 'react';
import type { Route } from './+types/SignIn';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ZodError } from 'zod';
import SignInForm from './signIn/form';
import SignInTOTP from './signIn/totp';
import { signInFormSchema } from './signIn/formValidation';
import useAuth from '../hooks/useAuth';
import logger from '../logger';
import { ROUTES } from '../constants';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  switch (language) {
    case 'sk':
    default:
      return [{ title: 'Prihlásiť sa | HramBedminton.sk' }];
  }
}

export function links() {
  return [
    { rel: 'alternate', href: `https://hrambedminton.sk/${ROUTES.sk.prefix}${ROUTES.sk.signIn}`, hrefLang: 'sk' },
  ];
}

export default function SignIn() {
  const { i18n, t } = useTranslation('', { keyPrefix: 'signIn' });
  const { signIn, confirmSignIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'totp'>('form');

  const onSubmit = useCallback(
    async (prevState: unknown, state: FormData): Promise<{ email: string; password: string; error: string | null }> => {
      const email = state.get('email') as string;
      const password = state.get('password') as string;
      let error = null;

      try {
        signInFormSchema.parse({ email, password });
      } catch (err) {
        logger.error('Unable to sign in!', { error: err });

        if (err instanceof ZodError) {
          return { email, password, error: err.issues.map((issue) => issue.message).join(', ') };
        }

        return { email, password, error: 'Unable to sign in!' };
      }

      try {
        const response = await signIn(email, password);
        if (response.isSuccess === false) {
          setStep('totp');
        } else {
          setTimeout(() => navigate(`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].profile}`), 100);
        }
      } catch (err: any) {
        logger.error('Unable to sign in!', { error: { message: err.message, stack: err.stack } });
        error = err.message;
      }

      return { email, password, error };
    },
    [signIn]
  );

  const onTOTPSubmit = useCallback(
    async (prevState: unknown, state: FormData): Promise<{ totpCode: string; error: string | null }> => {
      const totpCode = state.get('totpCode') as string;
      let error = null;

      await confirmSignIn(totpCode)
        .then(() => {
          setTimeout(() => navigate(`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].profile}`), 100);
        })
        .catch((err) => {
          logger.error('Unable to confirm sign in!', { error: { message: err.message, stack: err.stack } });
          error = err.message;
        });

      return { totpCode, error };
    },
    [confirmSignIn]
  );

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="/favicon.png" alt="HramBedminton.sk" className="mx-auto h-30 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{t('title')}</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {step === 'form' ? <SignInForm onSubmit={onSubmit} /> : <SignInTOTP onSubmit={onTOTPSubmit} />}

        {/* <div className="mt-10">
          <GoogleSignIn />
        </div> */}

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          {t('noAccount')}
          <Link
            to={`/${t('prefix', { keyPrefix: 'routes' })}${t('signUp', { keyPrefix: 'routes' })}`}
            className="font-semibold text-indigo-600 hover:text-indigo-500 ms-1"
          >
            {t('signUp')}
          </Link>
        </p>
      </div>
    </div>
  );
}
