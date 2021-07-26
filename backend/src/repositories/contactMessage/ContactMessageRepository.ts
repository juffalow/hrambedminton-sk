export interface CreateParameters {
  name: string;
  email: string;
  message: string;
}

export default interface ContactMessageRepository {
  get(id: string): Promise<ContactMessage>;

  create(params: CreateParameters): Promise<ContactMessage>;
}
