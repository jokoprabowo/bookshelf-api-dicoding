const booksHandler = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: booksHandler.add,
  },
  {
    method: 'GET',
    path: '/books',
    handler: booksHandler.getAll,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: booksHandler.getOne,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: booksHandler.update,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: booksHandler.delete,
  },
];

module.exports = routes;
