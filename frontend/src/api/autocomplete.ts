import config from '../config';

export async function getPlaces(name: string): Promise<{ value: string; label: string}[]> {
  const response = await fetch(`${config.api.url}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + localStorage.getItem('user-token'),
    },
    body: JSON.stringify({
      query: `
        query PlacesAutocomplete ($name: String) {
          places(first: 5, name: $name) {
            edges {
              node {
                id
                _id
                name
              }
            }
          }
        }
      `,
      variables: {
        name,
      },
    }),
  });

  const json = await response.json();

  return json.data.places.edges.map((edge: any) => ({
    value: edge.node._id,
    label: edge.node.name,
  }));
}
