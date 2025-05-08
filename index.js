```js
const express = require('express');
const axios = require('axios');
const { create } = require('@wppconnect-team/wppconnect');

const app = express();
app.use(express.json());

create({
  session: 'crm-integra',
  catchQR: (base64Qr, asciiQR) => {
    console.log('Escaneie o QR Code para conectar seu WhatsApp');
    console.log(asciiQR);
  },
}).then((client) => {
  client.onMessage(async (message) => {
    try {
      await axios.post('https://zmyzuinoailpmayifusx.supabase.co/functions/v1/whatsapp-webhook', {
        event: message.fromMe ? 'message_sent' : 'message_received',
        from: message.from,
        name: message.sender?.pushname || '',
        message: message.body
      });
    } catch (err) {
      console.error('Erro ao enviar para webhook:', err.message);
    }
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));


`package.json`
json
{
  "name": "wppconnect-crm",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@wppconnect-team/wppconnect": "^1.10.6",
    "axios": "^1.3.6",
    "express": "^4.18.2"
  }
}
```

---
