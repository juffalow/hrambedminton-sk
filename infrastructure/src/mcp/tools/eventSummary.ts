/** GraphQL selection of an Event for list tools (list_events, my_events) */
export const EVENT_SUMMARY_FIELDS = `
  id
  _id
  name
  description
  eventType
  date
  time
  timeZone
  startsAt
  place
  court
  maxPlayers
  players {
    id
  }
`;

export interface EventSummaryNode {
  id: string;
  _id: string;
  name: string;
  description: string | null;
  eventType: string;
  date: string;
  time: string;
  timeZone: string;
  startsAt: string;
  place: string;
  court: string;
  maxPlayers: number;
  players: { id: string }[];
}

export interface EventConnectionResult {
  edges: { cursor: string; node: EventSummaryNode }[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}

export function toEventSummary(node: EventSummaryNode) {
  return {
    id: node._id,
    publicId: node.id,
    path: `/sk/zapas/${node.id}`,
    name: node.name,
    description: node.description || null,
    eventType: node.eventType,
    date: node.date,
    time: node.time,
    timeZone: node.timeZone,
    startsAt: node.startsAt,
    place: node.place,
    court: node.court,
    maxPlayers: node.maxPlayers,
    playerCount: node.players.length,
  };
}

export function toEventConnection(connection: EventConnectionResult) {
  return {
    edges: connection.edges.map(({ cursor, node }) => ({ cursor, node: toEventSummary(node) })),
    pageInfo: connection.pageInfo,
  };
}
