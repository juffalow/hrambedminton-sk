import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <SEO title="" description="Hrávaš bedminton ale tiež nevieš ako si hral rok dozadu? Ulož si svoje hry a zisti či dosahujes lepšie skóre ako pred tým!">
      <Container>
        <Row>
          <Col>
            <h1>Hravas?</h1>
            <p className="lead">Hrávaš bedminton ale tiež nevieš ako si hral rok dozadu? Ulož si svoje hry a zisti či dosahujes lepšie skóre ako pred tým!</p>
            <p>Vsetko budes mat pekne v prehladnej tabulke a ku kazdej hre si mozes pridat aj vlastne poznamky. Mozes si pridat hry z minulosti ale aj planovat zapasy, ktore este len budes hrat.</p>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team 1</th>
                  <th>Team 2</th>
                  <th>Skore</th>
                  <th>Miesto</th>
                  <th>Datum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Marian Mist</td>
                  <td>Matej Jellus</td>
                  <td>4:4</td>
                  <td>Slavia Agrofert</td>
                  <td>21.7.202</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    Andrej Gajdos
                    <br />
                    Ming Tien
                  </td>
                  <td>
                    Kundan Kumar
                    <br />
                    Matej Jellus
                  </td>
                  <td>5:3</td>
                  <td>Slavia Agrofert</td>
                  <td>21.7.202</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Si trener?</h3>
            <p>Vytvor si trening, pozvi ludi a vzdy im pred tym pride e-mail, kde budu moct jednym klikom odpovedat ci sa treningu zucastnia alebo nie. Takto mozes vcas zrusit kurt, alebo zohnat nahradnika.</p>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <div style={{ backgroundColor: '#EEE', padding: 25 }}>
              <p>
                Ahoj ...,
                <br />
                zajtra mas trening s ***** ***** o 19:00 v ******. Prides?
              </p>
              <div style={{ textAlign: 'center' }}>
                <Button variant="success">Pridem</Button>
                <Button variant="danger" style={{ marginLeft: 25 }}>Nepridem</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 25 }}>
          <Col>
            <p>Treningy si potom mozes pozriet v dennom prehlade.</p>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <p><strong>14.7.2021</strong></p>
            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cas</th>
                  <th>Zverenci</th>
                  <th>Miesto</th>
                  <th>Ucast</th>
                  <th>Stav</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>7:00</td>
                  <td>Matej Jellus</td>
                  <td>Slavia Agrofert</td>
                  <td>Zucastni sa</td>
                  <td><span style={{ color: 'red' }}>Neuhradene</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>18:00</td>
                  <td>Matej Jellus</td>
                  <td>Slavia Agrofert</td>
                  <td>Nezucastni sa</td>
                  <td><span style={{ color: 'green' }}>Uhradene</span></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Na co sa mozes tesit?</h3>
            <p>V aplikacii neskor pribudnu statistiky (kolko zapasov som vyhral, kolko som prehral), moznost vybrat kosik, raketu, tenisky, ... A pokial by bolo prilis vela volneho casu, tak aj organizovanie turnajov :-)</p>
            <p>Pokial by si mal napad na dalsiu funkciu, kludne ma oslov a mozno budes mat stastie. Aplikacia je zadarmo a zdrojovy kod bude zverejneny na GitHub-e.</p>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Home;
