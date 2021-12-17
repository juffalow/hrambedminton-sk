import express from 'express';
import nodemailer from 'nodemailer';
import ical from 'ical-generator';
import aws from '../services/aws';

const router = express.Router();

router.get('/', async (req, res) => {

  const transporter = nodemailer.createTransport({
    SES: aws.ses,
  });

  const dateFrom = new Date();
  const dateTo = new Date();

  dateFrom.setDate(dateFrom.getDate() + 1);
  dateFrom.setTime(dateFrom.getTime() + (60 * 60 * 1000));

  dateTo.setDate(dateTo.getDate() + 1);
  dateTo.setTime(dateTo.getTime() + (2 * 60 * 60 * 1000));

  const calendar = ical({name: 'HramBedminton.sk', url: 'https://hrambedminton.sk' });
  calendar.createEvent({
    start: dateFrom,
    end: dateTo,
    summary: 'Example Event',
    description: 'It works ;)',
    location: 'Slavia Agrofert',
    url: 'https://hrambedminton.sk/'
});

  const info = await transporter.sendMail({
    from: '"HramBedminton.sk" <no-reply@hrambedminton.sk>',
    to: 'juffalow@gmail.com',
    subject: 'Test | HramBedminton.sk',
    html: '<p>Testovaci e-mail.</p>',
    icalEvent: {
        filename: 'invitation.ics',
        method: 'request',
        content: calendar.toString(),
    },
  });

  console.log('mail info', info);

  res.json({
    error: null,
    data: null,
  });
});

export default router;
