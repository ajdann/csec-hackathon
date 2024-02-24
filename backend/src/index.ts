// src/app.ts
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("Na ja, wie geht's dir?");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
