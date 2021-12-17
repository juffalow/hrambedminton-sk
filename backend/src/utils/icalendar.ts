import ical from 'ical-generator';

export function createEvent(summary: string, description: string, location: string, url: string, dateFrom: Date, dateTo: Date): string {
  const calendar = ical({name: 'HramBedminton.sk' });
  calendar.createEvent({
    summary,
    description,
    location,
    url,
    start: dateFrom,
    end: dateTo,
  });

  return calendar.toString();
}
