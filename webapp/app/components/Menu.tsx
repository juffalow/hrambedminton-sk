import { useState } from 'react';
import { Link, Button, Dropdown, Label, buttonVariants, linkVariants } from '@heroui/react';
import type { Key } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, matchPath } from 'react-router';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../constants';

export default function menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n, t } = useTranslation('', { keyPrefix: 'components.menu' });
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeLang = (key: Key) => {
    const code = String(key);
    const pathname = location.pathname;

    const route = Object.keys(ROUTES[i18n.language as keyof typeof ROUTES]).find((key) => {
      return matchPath(
        `/${ROUTES[i18n.language as keyof typeof ROUTES].prefix}${(ROUTES as any)[i18n.language][key]}`,
        pathname
      );
    });

    const pathnameParts = pathname.split('/');
    const newPathnameParts =
      `/${ROUTES[code as keyof typeof ROUTES].prefix}${(ROUTES as any)[code][route as string]}`.split('/');

    const redirectPathname = newPathnameParts
      .map((part, index) => {
        if (part.startsWith(':')) {
          return pathnameParts[index];
        }
        return part;
      })
      .join('/');

    i18n.changeLanguage(code);
    navigate(redirectPathname);
  };

  const lang = i18n.language === 'sk' ? <>&#x1F1F8;&#x1F1F0; SK</> : <>&#x1F1F8;&#x1F1F0; SK</>;

  const routePrefix = `/${t('prefix', { keyPrefix: 'routes' })}`;
  const routes = ROUTES[i18n.language as keyof typeof ROUTES];
  const linkClassName = linkVariants().base();
  const mobileLinkClassName = `${linkClassName} w-full text-lg text-foreground`;

  return (
    <nav className="w-full border-b border-separator">
      <header className="flex h-16 items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('navbarToggleClose') : t('navbarToggleOpen')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <RouterLink
            to={routePrefix}
            className={`${linkClassName} font-bold text-inherit`}
            data-tracking-id="desktop_menu_home_click"
          >
            <img src="/favicon.png" alt="HramBedminton.sk" width={32} height={32} />
            <span className="ms-2">HramBedminton.sk</span>
          </RouterLink>
        </div>

        {user !== null ? (
          <ul className="hidden sm:flex gap-4">
            <li>
              <RouterLink
                to={`${routePrefix}${routes.profile}`}
                className={`${linkClassName} text-foreground`}
                data-tracking-id="desktop_menu_profile_click"
              >
                {t('profile')}
              </RouterLink>
            </li>
          </ul>
        ) : null}

        <ul className="flex items-center gap-4">
          {user === null ? (
            <>
              <li className="hidden sm:flex">
                <RouterLink
                  to={`${routePrefix}${routes.signIn}`}
                  className={linkClassName}
                  data-tracking-id="desktop_menu_sign_in_click"
                >
                  {t('signIn')}
                </RouterLink>
              </li>
              <li className="hidden sm:flex">
                <RouterLink
                  to={`${routePrefix}${routes.signUp}`}
                  className={buttonVariants({ variant: 'tertiary' })}
                  data-tracking-id="desktop_menu_sign_up_click"
                >
                  {t('signUp')}
                </RouterLink>
              </li>
            </>
          ) : (
            <li className="hidden sm:flex">
              <Button variant="tertiary" onPress={signOut} data-tracking-id="desktop_menu_sign_out_click">
                {t('signOut')}
              </Button>
            </li>
          )}
          <li>
            <Dropdown>
              <Dropdown.Trigger className="p-0 bg-transparent">{lang}</Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu aria-label={t('language')} onAction={handleChangeLang}>
                  <Dropdown.Item id="sk" textValue="SK" className="gap-4 cursor-pointer">
                    <Label>&#x1F1F8;&#x1F1F0; SK</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </li>
        </ul>
      </header>

      {isMenuOpen ? (
        <ul id="mobile-menu" className="flex flex-col gap-2 px-6 pb-4 sm:hidden">
          {user !== null ? (
            <>
              <li>
                <RouterLink
                  to={`${routePrefix}${routes.profile}`}
                  className={mobileLinkClassName}
                  onClick={() => setIsMenuOpen(false)}
                  data-tracking-id="mobile_menu_profile_click"
                >
                  {t('profile')}
                </RouterLink>
              </li>
              <li>
                <Link
                  className="w-full text-lg text-danger"
                  onPress={signOut}
                  data-tracking-id="mobile_menu_sign_out_click"
                >
                  {t('signOut')}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <RouterLink
                  to={`${routePrefix}${routes.signIn}`}
                  className={mobileLinkClassName}
                  onClick={() => setIsMenuOpen(false)}
                  data-tracking-id="mobile_menu_sign_in_click"
                >
                  {t('signIn')}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to={`${routePrefix}${routes.signUp}`}
                  className={mobileLinkClassName}
                  onClick={() => setIsMenuOpen(false)}
                  data-tracking-id="mobile_menu_sign_up_click"
                >
                  {t('signUp')}
                </RouterLink>
              </li>
            </>
          )}
        </ul>
      ) : null}
    </nav>
  );
}
