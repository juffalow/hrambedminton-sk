import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BadmintonGame from '../components/BadmintonGame';

const Home: React.FC = () => {
  return (
    <SEO title="" description="Hrávaš bedminton ale tiež nevieš ako si hral rok dozadu? Ulož si svoje hry a zisti či dosahujes lepšie skóre ako pred tým!">
      <Container>
        <Row>
          <Col>
            <h1>Hrávaš?</h1>
            <p className="lead">Hrávaš bedminton ale tiež nevieš ako si hral rok dozadu? <Link to="/registracia">Zaregistruj sa</Link>, ulož si svoje hry a zisti či dosahujes lepšie skóre ako pred tým!</p>
            <p>Všetko budeš mať v prehľadnon zozname a ku každej hre si môžeš pridať aj vlastné poznámky. Môžeš si pridať hry z minulosti ale aj plánovať zápasy, ktoré ešte len budeš hrať.</p>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <span style={{ fontSize: '0.9em' }}><i>Ukážka zápasu</i></span>
            <BadmintonGame
              game={{
                id: '1',
                _id: '1',
                type: 'SINGLES',
                title: 'Pondeľkový priateľský zápas, Majo',
                place: 'Slávia Agrofert',
                court: '5',
                playedAt: '2021-10-12 19:00:00',
                description: 'Opäť veľmi náročná hra, behavý súper, ktorý mi to zadarmo rozhodne nepustí.',
                players: [],
              }}
            />
          </Col>
        </Row>
        <Row className="mt-4">
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
            <p>Tréningy si potom môžeš pozrieť v dennom prehľade.</p>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <span style={{ fontSize: '0.9em' }}><i>Ukážka prehľadu tréningov</i></span>
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
