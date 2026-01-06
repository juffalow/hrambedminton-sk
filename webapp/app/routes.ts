import { type RouteConfig, index, route, prefix } from '@react-router/dev/routes';
import { ROUTES } from './constants';

export default [
  index('./routes/index.tsx'),
  ...prefix(ROUTES.sk.prefix, [
    index('routes/Home.tsx', { id: 'sk-home-index' }),
    route(ROUTES.sk.signIn, 'routes/SignIn.tsx', { id: 'sk-sign-in' }),
    route(ROUTES.sk.signUp, 'routes/SignUp.tsx', { id: 'sk-sign-up' }),
    route(ROUTES.sk.profile, 'routes/Profile.tsx', { id: 'sk-profile' }),
    route(ROUTES.sk.match, 'routes/Match.tsx', { id: 'sk-match' }),
    route(ROUTES.sk.privacyPolicy, 'routes/PrivacyPolicy.tsx', { id: 'sk-privacy-policy' }),
  ]),
] satisfies RouteConfig;
