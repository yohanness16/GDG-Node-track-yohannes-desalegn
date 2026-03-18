import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import pinoHttp from 'pino-http';
import methodOverride from 'method-override'; 
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './lib/logger.js';
import connectMongoDb from './config/dbConfig.js';
import { globalErrorHandler } from './utils/Error.js';
import productRoutes from './router/productRoute.js';
import cartRoutes from './router/cartRoute.js';
import orderRoutes from './router/orderRoute.js';
import viewRoutes from './router/viewRoute.js'; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


connectMongoDb();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(methodOverride('_method')); 
app.use(session({
    secret: 'cart-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(pinoHttp({
  logger,
  autoLogging: {
    ignore: (req) => {
      const ignoredPaths = ['/css', '/js', '/favicon.ico', '/images'];
      return ignoredPaths.some(path => req.url.startsWith(path));
    }
  },
  customSuccessMessage: (req, res) => ` ${req.method} ${req.url} | ${res.statusCode} | Done`,
  customErrorMessage: (req, res) => `${req.method} ${req.url} | ${res.statusCode} | Failed`,
  quietReqLogger: true
}));

app.use('/pages', viewRoutes);   
app.use('/products', productRoutes); 
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);


app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  logger.info(`View the demo frontend  at: http://localhost:${port}/pages/products`);
});