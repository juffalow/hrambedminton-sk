export default function layout(content: string): string {
  return `
  <!DOCTYPE html>
  <html lang="sk">
    <head>
      <meta charset="UTF-8">
      <meta name="x-apple-disable-message-reformatting">
      <title></title>
    </head>
    <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:600px;border-collapse:collapse;border-spacing:0;text-align:left;">
              <tr>
                <td style="padding:20px;background:#f8f9fa!important;">
                  <a href="https://hrambedminton.sk" style="color: rgba(0, 0, 0, 0.9); text-decoration: none;">HramBedminton.sk</a>
                </td>
              </tr>
              <tr>
                <td style="padding:20px;">
                  ${content}
                </td>
              </tr>
              <tr>
                <td style="padding:20px;background:#f8f9fa!important;">
                  <a href="https://hrambedminton.sk" style="color: rgba(0, 0, 0, 0.9); text-decoration: none;">HramBedminton.sk</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
