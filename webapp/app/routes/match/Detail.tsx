import { gql, useQuery, useMutation } from 'urql';
import { Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Divider } from '@heroui/react';
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

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">{data?.event?.name}</h1>

      <div className="flex justify-center mb-4">
        <Chip color="default">{data?.event?.maxPlayers} hraci</Chip>
        {
          data?.event?.eventType === 'SINGLES' ? (
            <Chip color="default" className="ms-2">Dvojhra</Chip>
          ) : (
            <Chip color="default" className="ms-2">Stvorhra</Chip>
          )
        }
        <Chip color="default" className="ms-2">{formatDate(`${data?.event?.date}T${data?.event?.time}`, 'dd. MM. YYYY')}</Chip>
        <Chip color="default" className="ms-2">{formatDate(`${data?.event?.date}T${data?.event?.time}`, 'HH:mm')}</Chip>
        <Chip color="default" className="ms-2">{data?.event?.place}</Chip>
      </div>

      <p className="text-center text-gray-500 mb-4">{data?.event?.description}</p>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn className="text-base">Meno</TableColumn>
          <TableColumn className="text-base">Status</TableColumn>
          <TableColumn className="text-base">Pridal sa</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.event?.players.map((player: any, index: number) => (
            <TableRow key={player.id} className={index + 1 === data?.event?.maxPlayers ? 'border-t-2 border-t-orange-200' : ''}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.status}</TableCell>
              <TableCell>{formatDate(player.joinedAt, 'dd. MM. YYYY HH:mm')}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}>
              <Divider className="my-4" />
              <JoinGuestForm eventType={data?.event?.eventType} players={data?.event?.players} addGuestPlayer={handleAddGuestPlayer} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default Detail;
