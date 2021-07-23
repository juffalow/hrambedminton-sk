import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <SEO title="" description="Hrávaš bedminton ale tiež nevieš ako si hral rok dozadu? Ulož si svoje hry a zisti či dosahujes lepšie skóre ako pred tým!">
      <Container>
        <Row>
          <Col>
            <h1>Hrávaš?</h1>
            <p className="lead">Hrávaš bedminton ale tiež nevieš ako si hral rok dozadu? <Link to="/registracia">Zaregistruj sa</Link>, ulož si svoje hry a zisti či dosahujes lepšie skóre ako pred tým!</p>
            <p>Všetko budeš mať v prehľadnej tabulke a ku každej hre si môžeš pridať aj vlastné poznámky. Môžeš si pridať hry z minulosti ale aj plánovať zápasy, ktoré ešte len budeš hrať.</p>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <span style={{ fontSize: '0.9em' }}><i>Ukážka tabuľky zápasov</i></span>
            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team 1</th>
                  <th>Team 2</th>
                  <th>Skóre</th>
                  <th>Miesto</th>
                  <th>Dátum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ filter: 'blur(4px)' }}>13</td>
                  <td style={{ filter: 'blur(4px)' }}>Meno Priezvisko</td>
                  <td style={{ filter: 'blur(4px)' }}>Meno Priezvisko</td>
                  <td style={{ filter: 'blur(4px)' }}>1:1</td>
                  <td style={{ filter: 'blur(4px)' }}>Slavia Agrofert</td>
                  <td style={{ filter: 'blur(4px)' }}>20.7.2021</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>Marián Mišt</td>
                  <td>Matej Jelluš</td>
                  <td>4:4</td>
                  <td>Slávia Agrofert</td>
                  <td>21.7.2021</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>
                    Filip Gajdoš
                    <br />
                    Nguyen Tien Minh
                  </td>
                  <td>
                    Kundan Kumar
                    <br />
                    Matej Jelluš
                  </td>
                  <td>5:3</td>
                  <td>Slávia Agrofert</td>
                  <td>22.7.2021</td>
                </tr>
                <tr>
                  <td style={{ filter: 'blur(4px)' }}>16</td>
                  <td style={{ filter: 'blur(4px)' }}>Meno Priezvisko</td>
                  <td style={{ filter: 'blur(4px)' }}>Meno Priezvisko</td>
                  <td style={{ filter: 'blur(4px)' }}>1:1</td>
                  <td style={{ filter: 'blur(4px)' }}>Slavia Agrofert</td>
                  <td style={{ filter: 'blur(4px)' }}>23.7.2021</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Si tréner?</h3>
            <p>Vytvor si tréning a pozvi ľudí. Pred tréningom im príde e-mail, kde budú môcť jedným klikom odpovedať, či sa tréningu zúčastnia alebo nie. Takto môžeš včas zrušiť kurt, alebo zohnať náhradníka.</p>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <span style={{ fontSize: '0.9em' }}><i>Ukážka e-mailu</i></span>
            <div style={{ backgroundColor: '#EEE', padding: 25 }}>
              <p>
                Ahoj ...,
                <br />
                zajtra máš tréning s ***** ***** o 19:00 v ******. Prídeš?
              </p>
              <div style={{ textAlign: 'center' }}>
                <Button variant="success">Prídem</Button>
                <Button variant="danger" style={{ marginLeft: 25 }}>Neprídem</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 25 }}>
          <Col>
            <p>Tréningy si potom môžeš pozrieť v dennom prehlade.</p>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <span style={{ fontSize: '0.9em' }}><i>Ukážka prehladu treningov</i></span>
            <p><strong>14.7.2021</strong></p>
            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Čas</th>
                  <th>Zverenci</th>
                  <th>Miesto</th>
                  <th>Účasť</th>
                  <th>Stav</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ filter: 'blur(4px)' }}>122</td>
                  <td style={{ filter: 'blur(4px)' }}>6:00</td>
                  <td style={{ filter: 'blur(4px)' }}>Meno Priezvisko</td>
                  <td style={{ filter: 'blur(4px)' }}>Slavia Agrofert</td>
                  <td style={{ filter: 'blur(4px)' }}>Zúčastní sa</td>
                  <td style={{ filter: 'blur(4px)', color: 'green' }}>Uhradené</td>
                </tr>
                <tr>
                  <td>123</td>
                  <td>7:00</td>
                  <td>Matej Jelluš</td>
                  <td>Slávia Agrofert</td>
                  <td>Zúčastní sa</td>
                  <td><span style={{ color: 'red' }}>Neuhradené</span></td>
                </tr>
                <tr>
                  <td>124</td>
                  <td>18:00</td>
                  <td>Matej Jelluš</td>
                  <td>Slávia Agrofert</td>
                  <td>Nezúčastní sa</td>
                  <td><span style={{ color: 'green' }}>Uhradené</span></td>
                </tr>
                <tr>
                  <td style={{ filter: 'blur(4px)' }}>122</td>
                  <td style={{ filter: 'blur(4px)' }}>19:00</td>
                  <td style={{ filter: 'blur(4px)' }}>Meno Priezvisko</td>
                  <td style={{ filter: 'blur(4px)' }}>Slavia Agrofert</td>
                  <td style={{ filter: 'blur(4px)' }}>Zúčastní sa</td>
                  <td style={{ filter: 'blur(4px)', color: 'red' }}>Neuhradené</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Na čo sa môžeš tešiť?</h3>
            <p>V aplikácii neskôr pribudnú štatistiky (koľko zápasov si vyhral, kolko si prehral), možnosť vybrať košík, raketu, tenisky, ... A pokiaľ by bolo príliš veľa voľného času, tak aj organizovanie turnajov :-)</p>
            <p>Pokiaľ by si mal nápad na dalšiu funkciu, kľudne ma oslov a možno budeš mať štastie. Aplikácia je zadarmo a zdrojový kód bude zverejnený na GitHub-e.</p>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Home;
