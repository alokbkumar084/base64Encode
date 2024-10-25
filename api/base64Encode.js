const express = require('express');
const app = express();
app.use(express.json());

const isLikelyJwt = (token) => {
  const parts = token.split('.');
  return parts.length === 3 && parts.every(part => /^[A-Za-z0-9-_]+$/.test(part));
};

const jwtFormatCheckMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ message: 'Token missing in authorization header' });
  }

  if (!isLikelyJwt(token)) {
    return res.status(400).json({ message: 'Invalid JWT format' });
  }

  next();
};

app.post('/api/base64Encode', jwtFormatCheckMiddleware,(req, res) => {
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
