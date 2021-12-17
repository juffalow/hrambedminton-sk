export interface CreateParameters {
  name: string;
}

export interface FindParameters {
  first: number;
  offset: number;
  name: string;
}

export interface CountParameters {
  name: string;
}

export default interface PlaceRepository {
  get(id: string): Promise<Place>;

  create(params: CreateParameters): Promise<Place>;

  find(params: FindParameters): Promise<Place[]>;

  count(params: CountParameters): Promise<number>;
}
