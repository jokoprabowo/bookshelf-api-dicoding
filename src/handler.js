const { nanoid } = require('nanoid');
const books = require('./books');

const booksHandler = {

  add(request, h) {
    try {
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      } = request.payload;

      const id = nanoid(16);
      const insertedAt = new Date().toISOString();
      const updatedAt = insertedAt;
      let finished;

      if (name === undefined) {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
      }

      if (reading) {
        if (readPage <= pageCount) {
          finished = false;
        } else if (readPage === pageCount) {
          finished = true;
        } else {
          return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku, readPage tidak boleh lebih besar daari pageCount',
          }).code(400);
        }
      } else {
        finished = false;
      }

      const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
      };
      books.push(newBook);

      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: newBook.id,
        },
      }).code(201);
    } catch (error) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku',
      }).code(500);
    }
  },

  getAll(request, h) {
    try {
      return h.response({
        status: 'success',
        data: {
          books,
        },
      }).code(200);
    } catch (error) {
      return h.response({
        status: 'fail',
        message: 'Gagal mengambil data buku',
      }).code(500);
    }
  },

  getOne(request, h) {
    try {
      const { id } = request.params;
      const book = books.filter((data) => data.id === id)[0];

      if (book === undefined) {
        return h.response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        }).code(404);
      }

      return h.response({
        status: 'success',
        data: {
          book,
        },
      }).code(200);
    } catch (error) {
      return h.response({
        status: 'fail',
        message: 'Gagal mengambil data buku',
      }).code(500);
    }
  },

};

module.exports = booksHandler;
