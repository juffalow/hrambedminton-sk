import { Suspense } from 'react';
import type { Route } from './+types/Match';
import { useParams } from 'react-router';
import List from './userMatches/List';

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

export default function UserMatches() {
  const params = useParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <List />
    </Suspense>
  );
}
