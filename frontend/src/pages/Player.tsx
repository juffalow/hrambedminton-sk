import React from 'react';
import { Route } from 'react-router-dom';
import getLazyComponent from '../utils/getLazyComponent';

const Profile = getLazyComponent(() => import('./player/Profile'));
const NewGame = getLazyComponent(() => import('./player/NewGame'));

const Player: React.FC = () => {
  return (
    <>
      <Route path="/hrac/profil" component={Profile} />
      <Route path="/hrac/novy-zapas" component={NewGame} />
    </>
  );
}

export default Player;
