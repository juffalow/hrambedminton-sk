import React, { useState } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import environment from './environment';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Confirmation from './pages/Confirmation';
import Trainers from './pages/Trainers';
import Register from './pages/Register';
import Login from './pages/Login';
import Player from './pages/Player';
import { setToken } from './api/token';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';

const App: React.FC = () => {
  const [ isLogged, setIsLogged ] = useState<boolean>(localStorage.getItem('userToken') !== null);

  const onLogin = (response: { id: string; expiresAt: string; token: string; }) => {
    setToken(response);
    setIsLogged(true);
  }

  const onLogout = () => {
    setToken({ id: '', expiresAt: '', token: null });
    setIsLogged(false);
  }

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Router>
        <>
          <Menu isLogged={isLogged} onLogout={onLogout} />
          <main role="main" className="flex-shrink-0 main-container" style={{ marginTop: 25, marginBottom: 25 }}>
            <Route path="/registracia" component={Register} />
            <Route path="/prihlasit-sa" render={() => (
              <Login onSuccess={onLogin} />
            )} />
            <Route path="/" component={Home} exact />

            <Route path="/kontakt" component={Contact} />
            <Route path="/potvrdenie" component={Confirmation} />
            <Route path="/treneri" component={Trainers} />
            <Route path="/hrac/*" component={Player} />
          </main>
          <Footer />
        </>
      </Router>
    </RelayEnvironmentProvider>
  );
}

export default App;
