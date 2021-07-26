import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Trainers from './pages/Trainers';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';

const App: React.FC = () => {
  const [ isLogged, setIsLogged ] = useState<boolean>(localStorage.getItem('userToken') !== null);

  const onLogin = (user: { firstName: string; lastName: string; token: string; }) => {
    localStorage.setItem('userToken', user.token);
    setIsLogged(true);
  }

  const onLogout = () => {
    localStorage.removeItem('userToken');
    setIsLogged(false);
  }

  return (
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
          <Route path="/treneri" component={Trainers} />
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
