import express from 'express';
import morgan from 'morgan';

import bookRoutes from './routes/bookRoutes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
})

export default app;