import layout from './layout';

export default function registration(title: string, name: string, email: string, message: string): string {
  const content = `
    <p><strong>Ahoj,</strong></p>
    <p>práve prišla nová správa z kontaktného formulára!</p>
    <p>Od: ${name}, ${email}</p>
    <p>${message}</p>
  `;

  return layout(title, content);
}
