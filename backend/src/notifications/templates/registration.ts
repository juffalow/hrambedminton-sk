import layout from './layout';

export default function registration(title: string, name: string, confirmationLink: string): string {
  const content = `
    <p><strong>Ahoj ${name},</strong></p>
    <p>vitaj na <a href="https://hrambedminton.sk">HramBedminton.sk</a>! Pre úspešné dokončenie registrácie je nutné overiť túto e-mailovú adresu kliknutím na nasledujúce tlačítko:</p>
    <div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
      <a href="${confirmationLink}" style="padding: 8px 12px;color: #28a745; border: 1px solid #28a745;border-radius: 2px;text-decoration: none;display: inline-block;" target="_blank">Potvrdiť e-mailovú adresu</a>
    </div>
    <p>Registrácia je zadarmo a tvoje údaje nebudú s nikým zdielané.</p>
    <p><i>V prípade ak si sa neregistroval a táto e-mailová adresa bola len zneužitá, tak tento e-mail ignoruj.</i></p>
  `;

  return layout(title, content);
}
