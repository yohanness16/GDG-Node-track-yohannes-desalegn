import { v4 as uuidv4 } from 'uuid';

const books = [];

export const getAllBooks = (req, res) => {
  res.json({
    message: 'List of all books',
    data: books
  })
}

export const searchBooks = (req, res) => {
  res.send('You are on the search page');
}

export const getBookById = (req, res) => {
  const { id } = req.params;
  const book = books.find(b => b.id === id);

  if(!book){
    return res.status(404).json({
      message: '404: Book not found'
    });
  }

  res.json({
    message: 'Book found',
    data: book
  })
}

export const createBook = (req, res) => {

  const newBook = {
    id: uuidv4(),
    ...req.validatedBody
  }

  books.push(newBook);

  res.status(201).json({
    message: 'Book created successfully',
    data: newBook
  })
}

export const deleteBook = (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(b => b.id === id);

  if(bookIndex === -1){
    return res.status(404).json({
      message: '404: Book not found'
    })
  }

  books.splice(bookIndex, 1);

  res.json({
    message: 'Book deleted successfully'
  })
}
