import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const HOME_HTML = `
  <html>
    <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
      <h1 style="color: green; font-size: 5rem; font-family: sans-serif;">
        Welcome to the Home Page
      </h1>
    </body>
  </html>
`;

app.get('/home', (req, res) => {
  res.status(200).send(HOME_HTML);
});

app.get('/about', (req, res) => {
  res.status(200).send('This is About page');
});

app.get('/students/:studentId', (req, res) => {
  const { studentId } = req.params;
  
  res.status(200).json({
    studentId,
    ...req.query
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});