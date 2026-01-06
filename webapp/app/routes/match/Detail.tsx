import { gql, useQuery } from 'urql';
import {
  Button,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react';

const MatchDetailQuery = gql`
  query MatchDetailQuery($id: ID!) {
    author(id: $id) {
      id
      firstName
      lastName
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
      'id': id,
    },
  });

  const { data } = result;

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">Event name</h1>

      <div className="flex justify-center mb-4">
        <Chip color="default">4 hraci</Chip>
        <Chip color="default" className="ms-2">2026-01-15</Chip>
        <Chip color="default" className="ms-2">10:00</Chip>
        <Chip color="default" className="ms-2">Slavia Agrofert</Chip>
      </div>

      <p className="text-center text-gray-500 mb-4">Match description</p>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn className="text-base">Hrac 1</TableColumn>
          <TableColumn className="text-base">Hrac 2</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Janette</TableCell>
            <TableCell>Milan</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Nick</TableCell>
            <TableCell>Kika</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Matej</TableCell>
            <TableCell>Zdenka</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>
              <Button color="primary" variant="flat">Pridat sa</Button>
            </TableCell>
            <TableCell>
              <Button color="primary" variant="flat">Pridat sa</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default Detail;
