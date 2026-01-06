import { useState } from 'react';
import type { MouseEvent } from 'react';
import {
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
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

  const onChangeLang = (e: MouseEvent) => {
    const code = (e.target as HTMLElement).getAttribute('data-lang') || 'sk';
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

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} position="static" maxWidth="full" isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? t('navbarToggleClose') : t('navbarToggleOpen')}
          className="sm:hidden"
          as={'a'}
          role="button"
        />
        <NavbarBrand>
          <Link
            as={RouterLink}
            to={`/${t('prefix', { keyPrefix: 'routes' })}`}
            className="font-bold text-inherit"
            data-tracking-id="desktop_menu_home_click"
          >
            <Image src="/favicon.png" alt="HramBedminton.sk" width={32} height={32} />
            <span className="ms-2">HramBedminton.sk</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {user !== null ? (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link
              as={RouterLink}
              to={`/${t('prefix', { keyPrefix: 'routes' })}${ROUTES[i18n.language as keyof typeof ROUTES].profile}`}
              color="foreground"
              data-tracking-id="desktop_menu_profile_click"
            >
              {t('profile')}
            </Link>
          </NavbarItem>
          {/* <NavbarItem>
            <Link
              as={RouterLink}
              to={`/${t('prefix', { keyPrefix: 'routes' })}${ROUTES[i18n.language as keyof typeof ROUTES].matches}`}
              color="foreground"
              data-tracking-id="desktop_menu_matches_click"
            >
              {t('matches')}
            </Link>
          </NavbarItem> */}
        </NavbarContent>
      ) : null}

      <NavbarContent justify="end">
        {user === null ? (
          <>
            <NavbarItem className="hidden sm:flex">
              <Link
                as={RouterLink}
                to={`/${t('prefix', { keyPrefix: 'routes' })}${ROUTES[i18n.language as keyof typeof ROUTES].signIn}`}
                data-tracking-id="desktop_menu_sign_in_click"
              >
                {t('signIn')}
              </Link>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button
                as={RouterLink}
                to={`/${t('prefix', { keyPrefix: 'routes' })}${ROUTES[i18n.language as keyof typeof ROUTES].signUp}`}
                color="primary"
                variant="flat"
                data-tracking-id="desktop_menu_sign_up_click"
              >
                {t('signUp')}
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden sm:flex">
            <Button color="primary" variant="flat" onPress={signOut} data-tracking-id="desktop_menu_sign_out_click">
              {t('signOut')}
            </Button>
          </NavbarItem>
        )}
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                {lang}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownItem key="sk" onClick={onChangeLang} data-lang="sk" className="cursor-pointer">
              &#x1F1F8;&#x1F1F0; SK
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {user !== null ? (
          <>
            <NavbarMenuItem>
              <Link
                as={RouterLink}
                className="w-full"
                color="foreground"
                to={`/${t('prefix', { keyPrefix: 'routes' })}${ROUTES[i18n.language as keyof typeof ROUTES].profile}`}
                onClick={() => setIsMenuOpen(false)}
                size="lg"
                data-tracking-id="mobile_menu_profile_click"
              >
                {t('profile')}
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full"
                color="danger"
                size="lg"
                onPress={signOut}
                data-tracking-id="mobile_menu_sign_out_click"
              >
                {t('signOut')}
              </Link>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link
                as={RouterLink}
                className="w-full"
                color="foreground"
                to={`/${t('prefix', { keyPrefix: 'routes' })}${ROUTES[i18n.language as keyof typeof ROUTES].signIn}`}
                onClick={() => setIsMenuOpen(false)}
                size="lg"
                data-tracking-id="mobile_menu_sign_in_click"
              >
                {t('signIn')}
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                as={RouterLink}
                className="w-full"
                color="foreground"
                to={`/${t('prefix', { keyPrefix: 'routes' })}${ROUTES[i18n.language as keyof typeof ROUTES].signUp}`}
                onClick={() => setIsMenuOpen(false)}
                size="lg"
                data-tracking-id="mobile_menu_sign_up_click"
              >
                {t('signUp')}
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
