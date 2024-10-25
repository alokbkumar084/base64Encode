const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/base64Encode', (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }
  const output = Buffer.from(input).toString('base64');
  res.json({ output });
});

app.get('/api/base64Encode', (req, res) => {
  const docs = {
    name: "base64Encode",
    description: "Encode anything to base64",
    input: {
      type: "string",
      description: "Input the data you'd like to encode to base64",
      example: "Hello, world"
    },
    output: {
      type: "string",
      description: "Base64 encoded string",
      example: "SGVsbG8sIHdvcmxk"
    }
  };
  res.json(docs);
});

module.exports = app;
