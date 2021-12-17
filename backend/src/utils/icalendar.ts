import { default as ics } from 'ics';

export function createEvent(summary: string, description: string, location: string, url: string, dateFrom: Date, dateTo: Date): string {
  const { error, value } = ics.createEvent({
    calName: 'HramBedminton.sk',
    start: [ dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate(), dateFrom.getHours(), dateFrom.getMinutes() ],
    end: [ dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate(), dateTo.getHours(), dateTo.getMinutes() ],
    title: 'Example Event',
    description: 'It works ;)',
    location: 'Slavia Agrofert',
    url: 'https://hrambedminton.sk/'
  });

  return value;
}
