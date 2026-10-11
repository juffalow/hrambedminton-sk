import { useMemo } from 'react';
import { gql, useQuery, useMutation } from 'urql';
import { Chip, Table, Separator } from '@heroui/react';
import JoinGuestForm from './JoinGuestForm';
import { formatDate } from '../../utils/functions';

const MatchDetailQuery = gql`
  query EventDetailQuery($id: ID!) {
    event(id: $id) {
      id
      eventType
      name
      description
      place
      date
      time
      maxPlayers
      players {
        id
        name
        role
        status
        team
        joinedAt
      }
    }
  }
`;

const AddGuestPlayerMutation = `
  mutation AddGuestPlayer($input: AddGuestPlayerInput!) {
    addGuestPlayer(input: $input) {
      guestId
      success
    }
  }
`;

interface Props {
  id: string;
}

const Detail = ({ id }: Props) => {
  const [result] = useQuery({
    query: MatchDetailQuery,
    variables: {
      id: id,
    },
  });
  const [, addGuestPlayer] = useMutation(AddGuestPlayerMutation);

  const handleAddGuestPlayer = async (guestName: string, guestEmail: string, team: string) => {
    console.log('Adding guest player', { guestName, guestEmail, team });
    const result = await addGuestPlayer({ input: { eventId: id, guestName, guestEmail, team } });
    console.log(result);
  };

  const { data } = result;
  const players = useMemo(
    () =>
      data?.event?.players.reduce((acc: Record<string, EventPlayer[]>, player: EventPlayer) => {
        acc[player.team] = [...(acc[player.team] || []), player];
        return acc;
      }, {}),
    [data?.event?.players]
  );
  const teammates = useMemo(() => {
    return data?.event?.players.filter(
      (player: EventPlayer) =>
        !data?.event?.players.some((p: EventPlayer) => p.team === player.team && p.id !== player.id)
    );
  }, [players]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">{data?.event?.name}</h1>

      <div className="flex justify-center mb-4">
        <Chip color="default">{data?.event?.maxPlayers} hraci</Chip>
        {data?.event?.eventType === 'SINGLES' ? (
          <Chip color="default" className="ms-2">
            Dvojhra
          </Chip>
        ) : (
          <Chip color="default" className="ms-2">
            Stvorhra
          </Chip>
        )}
        <Chip color="default" className="ms-2">
          {formatDate(`${data?.event?.date}T${data?.event?.time}`, 'dd. MM. YYYY')}
        </Chip>
        <Chip color="default" className="ms-2">
          {formatDate(`${data?.event?.date}T${data?.event?.time}`, 'HH:mm')}
        </Chip>
        <Chip color="default" className="ms-2">
          {data?.event?.place}
        </Chip>
      </div>

      <p className="text-center text-gray-500 whitespace-pre mb-4">{data?.event?.description}</p>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Hráči">
            <Table.Header>
              <Table.Column isRowHeader className="text-base">
                Meno
              </Table.Column>
              <Table.Column className="text-base">Status</Table.Column>
              <Table.Column className="text-base">Pridal sa</Table.Column>
            </Table.Header>
            <Table.Body>
              {Object.keys(players || {}).map((team: string, index: number) => (
                <Table.Row
                  key={team}
                  id={team}
                  className={index + 1 === data.event.maxPlayers ? 'border-t-2 border-t-orange-200' : ''}
                >
                  <Table.Cell>
                    {players[team][0].name}
                    {players[team].length > 1 ? ` a ${players[team][1].name}` : ''}
                  </Table.Cell>
                  <Table.Cell>{players[team][0].status === 'confirmed' ? 'Potvrdil(a)' : 'Nepotvrdil(a)'}</Table.Cell>
                  <Table.Cell>{formatDate(players[team][0].joinedAt, 'dd. MM. YYYY HH:mm')}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        {/* Outside Table.Content: the table is a keyboard-navigable grid, which would capture typing in the form */}
        <Table.Footer className="block">
          <Separator className="my-4" />
          <JoinGuestForm eventType={data?.event?.eventType} players={teammates} addGuestPlayer={handleAddGuestPlayer} />
        </Table.Footer>
      </Table>
    </>
  );
};

export default Detail;
