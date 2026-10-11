import { gql, useQuery } from 'urql';

const MatchDetailQuery = gql`
  query MyEventsQuery {
    me {
      events(filter: OWNED) {
        edges {
          node {
            id
            _id
            name
            eventType
            description
            place
          }
        }
      }
    }
  }
`;


const List = () => {
  const [result] = useQuery({
    query: MatchDetailQuery,
  });

  const { data } = result;

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">My matches</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  );
};

export default List;
