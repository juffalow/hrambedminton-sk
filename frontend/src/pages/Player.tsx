import React from 'react';
import { Route } from 'react-router-dom';
import getLazyComponent from '../utils/getLazyComponent';

const Profile = getLazyComponent(() => import('./player/Profile'));
const Dashboard = getLazyComponent(() => import('./player/Dashboard'));
const NewGame = getLazyComponent(() => import('./player/NewGame'));
const ScheduleGame = getLazyComponent(() => import('./player/ScheduleGame'));

const Player: React.FC = () => {
  return (
    <>
      <Route path="/hrac/profil" component={Profile} />
      <Route path="/hrac/prehlad" component={Dashboard} />
      <Route path="/hrac/naplanovat-zapas" component={ScheduleGame} />
      <Route path="/hrac/novy-zapas" component={NewGame} />
    </>
  );
}

export default Player;
