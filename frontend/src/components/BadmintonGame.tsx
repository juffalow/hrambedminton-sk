import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './BadmintonGame.css';

interface BadmintonGameProps {
  game: Game;
}

const BadmintonGame = (props: BadmintonGameProps) => (
  <div className="game-detail">
    <p className="mb-1"><strong>Matej Jellus</strong>, <small>dnes 12:00, {props.game.place}</small></p>
    <h3>{props.game.title}</h3>
    <p>{props.game.description}</p>
    <Row style={{ marginTop: 40 }} className="list-of-sets">
      <div className="set">
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Matej Jellus
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>22</strong>
          </div>
        </div>
        <hr />
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>20</strong>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Marian Mist
          </div>
        </div>
      </div>
      <div className="set">
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Matej Jellus
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>24</strong>
          </div>
        </div>
        <hr />
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>26</strong>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Marian Mist
          </div>
        </div>
      </div>
      <div className="set">
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Matej Jellus
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>21</strong>
          </div>
        </div>
        <hr />
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>15</strong>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Marian Mist
          </div>
        </div>
      </div>
      <div className="set">
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Matej Jellus
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>22</strong>
          </div>
        </div>
        <hr />
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>20</strong>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Marian Mist
          </div>
        </div>
      </div>
      <div className="set">
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Matej Jellus
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>23</strong>
          </div>
        </div>
        <hr />
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>21</strong>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Marian Mist
          </div>
        </div>
      </div>
      <div className="set">
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Matej Jellus
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>21</strong>
          </div>
        </div>
        <hr />
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>18</strong>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Marian Mist
          </div>
        </div>
      </div>
      <div className="set">
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Matej Jellus
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>21</strong>
          </div>
        </div>
        <hr />
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>18</strong>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Marian Mist
          </div>
        </div>
      </div>
      <div className="set">
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Matej Jellus
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>21</strong>
          </div>
        </div>
        <hr />
        <div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.5em', fontWeight: 500 }}>11</strong>
          </div>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            Marian Mist
          </div>
        </div>
      </div>
    </Row>
  </div>
);

BadmintonGame.defaultProps = {
  game: {
    title: 'Bedminton, Majo',
    owner: {
      firstName: 'Matej',
      lastName: 'Jellus',
    },
    place: 'Slavia Agrofert',
    playedAt: '2021-10-12 19:00:00',
    court: '5',
    description: 'Klasicky zapasik, behacka riadna.',
    sets: [

    ],
  }
}

export default BadmintonGame;
