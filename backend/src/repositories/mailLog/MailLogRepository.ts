export interface CreateParameters {
  fromEmail: string;
  fromName: string;
  replyToEmail: string;
  replyToName: string;
  addresses: string[];
  subject: string;
  body: string;
}

export interface FindParameters {
  first: number;
  offset: number;
  address?: string;
  subject?: string;
  orderBy?: Array<OrderBy>
}

export interface CountParameters {
  address?: string;
  subject?: string;
}

export default interface MailLogRepository {
  create(params: CreateParameters): Promise<MailLog>;

  find(params: FindParameters): Promise<MailLog[]>;

  count(params: CountParameters): Promise<number>;
}
