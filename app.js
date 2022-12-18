const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const message = { id: 1, title: "Blog title", description: "Blog description" }
    res.send(message);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi.`);
});