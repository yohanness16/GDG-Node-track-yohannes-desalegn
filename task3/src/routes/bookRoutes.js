import express from 'express';
import { validateBook } from '../middlewares/validateBook.js';
import { createBook, deleteBook, getAllBooks, getBookById, searchBooks } from '../controllers/bookController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllBooks)
  .post(validateBook, createBook);

router
  .route('/search')
  .get(searchBooks);

router
  .route('/:id')
  .get(getBookById)
  .delete(deleteBook);
export default router;