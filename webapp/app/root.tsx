import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import * as Sentry from '@sentry/react';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { AuthProvider } from './hooks/useAuth';
import { TrackingProvider } from './hooks/useTracking';
import type { Route } from './+types/root';
import Menu from './components/Menu';
import Footer from './components/Footer';
import i18n from './i18n';
import './app.css';
import { getUserIDToken } from './api/auth';

if (typeof import.meta.env.VITE_SENTRY_DSN === 'string')
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [],
  });

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.png',
  },
];

const client = new Client({
  url: import.meta.env.VITE_GRAPHQL_API_URL,
  suspense: true,
  preferGetMethod: false,
  exchanges: [
    cacheExchange,
    authExchange(async (utils) => {
      let token = await getUserIDToken();

      return {
        // Signed-in users call AppSync with their Cognito ID token (raw JWT, no "Bearer"), others with the API key
        addAuthToOperation(operation) {
          return utils.appendHeaders(
            operation,
            token ? { Authorization: token } : { 'x-api-key': import.meta.env.VITE_GRAPHQL_API_KEY }
          );
        },
        // Re-read the session before every operation: the user may have signed in or out since the last one.
        // fetchAuthSession is served from Amplify's local cache and refreshes the token only when it has expired.
        willAuthError() {
          return true;
        },
        didAuthError(error) {
          return (
            error.response?.status === 401 ||
            error.graphQLErrors.some(
              (graphQLError) =>
                (graphQLError.originalError as { errorType?: string } | undefined)?.errorType ===
                'UnauthorizedException'
            )
          );
        },
        async refreshAuth() {
          token = await getUserIDToken();
        },
      };
    }),
    fetchExchange,
  ],
});

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const language = location.pathname.split('/')[1] || 'sk';

  if (i18n.resolvedLanguage !== language && location.pathname !== '/') {
    i18n.changeLanguage(language);
  }

  return (
    <html lang={language} className="light" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />

        {import.meta.env.VITE_NODE_ENV === 'production' && (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-22B1H6KBPT"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-22B1H6KBPT');
              `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-background text-foreground">
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <TrackingProvider>
              <Provider value={client}>
                <div className="flex flex-col min-h-svh">
                  <Menu />

                  <main className="flex-grow container mx-auto pt-8 pb-8 px-2 md:px-0">{children}</main>

                  <Footer />
                </div>
              </Provider>
            </TrackingProvider>
          </AuthProvider>
        </I18nextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    Sentry.captureException(error);

    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
