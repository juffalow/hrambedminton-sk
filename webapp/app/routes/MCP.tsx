import type { Route } from './+types/MCP';
import { useTranslation, Trans } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { Alert, Card, Separator, Tabs, linkVariants } from '@heroui/react';
import CodeBlock from '../components/CodeBlock';
import { ROUTES } from '../constants';

const MCP_SERVER_URL = import.meta.env.VITE_MCP_SERVER_URL as string;
const MCP_CLIENT_ID = import.meta.env.VITE_MCP_CLIENT_ID as string;
/** Must match the callback URL registered for the MCP app client in Cognito (infrastructure McpConstruct) */
const CLAUDE_CODE_CALLBACK_PORT = 8976;

const TOOLS = ['listEvents', 'getEvent', 'myEvents', 'createEvent', 'me'];
const EXAMPLES = ['thisWeek', 'freeSpots', 'myEvents', 'createEvent', 'players'];

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  return [
    { title: 'MCP | HramBedminton.sk' },
    language === 'sk' && {
      name: 'description',
      content:
        'Pripojte HramBedminton.sk k Claude cez MCP a plánujte bedmintonové zápasy konverzáciou s AI asistentom.',
    },
  ];
}

export function links() {
  return [{ rel: 'alternate', href: `https://hrambedminton.sk/sk/${ROUTES.sk.mcp}`, hrefLang: 'sk' }];
}

export default function MCP() {
  const { t } = useTranslation('', { keyPrefix: 'mcp' });

  const claudeCodeCommand =
    `claude mcp add --transport http --client-id ${MCP_CLIENT_ID} ` +
    `--callback-port ${CLAUDE_CODE_CALLBACK_PORT} hrambedminton ${MCP_SERVER_URL}`;
  const copyLabels = { copyLabel: t('copy'), copiedLabel: t('copied') };
  const transComponents = {
    strong: <strong />,
    code: <code className="rounded bg-gray-100 px-1 font-mono text-sm" />,
  };

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold">{t('title')}</h1>
        <p className="mt-3 text-xl text-gray-500">{t('subtitle')}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">{t('what.title')}</h2>
        <p>
          <Trans t={t} i18nKey="what.paragraph1" components={transComponents} />
        </p>
        <p>{t('what.paragraph2')}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">{t('tools.title')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Card key={tool}>
              <Card.Header>
                <Card.Title>{t(`tools.${tool}.name`)}</Card.Title>
                <Card.Description>{t(`tools.${tool}.description`)}</Card.Description>
              </Card.Header>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">{t('requirements.title')}</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <Trans
              t={t}
              i18nKey="requirements.account"
              components={{
                link: (
                  <RouterLink
                    to={`/${ROUTES.sk.prefix}${ROUTES.sk.signUp}`}
                    className={linkVariants().base()}
                    data-tracking-id="mcp_sign_up_click"
                  />
                ),
              }}
            />
          </li>
          <li>{t('requirements.client')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('connect.title')}</h2>

        <div className="space-y-2">
          <p className="font-medium">{t('connect.serverUrl')}</p>
          <CodeBlock code={MCP_SERVER_URL} {...copyLabels} trackingId="mcp_copy_server_url_click" />
          <p className="font-medium">{t('connect.clientId')}</p>
          <CodeBlock code={MCP_CLIENT_ID} {...copyLabels} trackingId="mcp_copy_client_id_click" />
        </div>

        <Tabs>
          <Tabs.ListContainer>
            <Tabs.List aria-label={t('connect.title')}>
              <Tabs.Tab id="claude-code">
                {t('connect.claudeCode.tab')}
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="claude-ai">
                {t('connect.claudeAi.tab')}
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <Tabs.Panel id="claude-code" className="pt-4">
            <ol className="list-decimal list-inside space-y-3">
              <li>
                {t('connect.claudeCode.step1')}
                <div className="mt-2">
                  <CodeBlock code={claudeCodeCommand} {...copyLabels} trackingId="mcp_copy_claude_code_command_click" />
                </div>
              </li>
              <li>
                <Trans t={t} i18nKey="connect.claudeCode.step2" components={transComponents} />
              </li>
              <li>{t('connect.claudeCode.step3')}</li>
            </ol>
            <p className="mt-3 text-sm text-gray-500">
              {t('connect.claudeCode.note', { port: CLAUDE_CODE_CALLBACK_PORT })}
            </p>
          </Tabs.Panel>

          <Tabs.Panel id="claude-ai" className="pt-4">
            <ol className="list-decimal list-inside space-y-3">
              {['step1', 'step2', 'step3', 'step4'].map((step) => (
                <li key={step}>
                  <Trans t={t} i18nKey={`connect.claudeAi.${step}`} components={transComponents} />
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-gray-500">{t('connect.claudeAi.note')}</p>
          </Tabs.Panel>
        </Tabs>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">{t('examples.title')}</h2>
        <ul className="space-y-2">
          {EXAMPLES.map((example) => (
            <li key={example} className="rounded-lg border border-gray-200 px-4 py-2 italic">
              „{t(`examples.${example}`)}“
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">{t('security.title')}</h2>
        <Alert status="accent">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description>
              <Trans t={t} i18nKey="security.paragraph1" components={transComponents} />
            </Alert.Description>
          </Alert.Content>
        </Alert>
        <p>
          <Trans t={t} i18nKey="security.paragraph2" components={transComponents} />
        </p>
      </section>
    </div>
  );
}
