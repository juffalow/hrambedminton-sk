
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode';
import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes';
import config from './config';
import { getToken } from './api/token';

async function fetchGraphQL(params: RequestParameters, variables: Variables) {
  const headers = new Headers({ 'Content-Type': 'application/json' });

  if (localStorage.getItem('user-token') !== null) {
    headers.set('Authorization', 'Bearer ' + getToken());
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('token')) {
    headers.set('Authorization', 'Bearer ' + urlParams.get('token'));
  }

  const response = await fetch(`${config.api.url}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return await response.json();
}

export default new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
});
