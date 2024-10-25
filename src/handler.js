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

  update(request, h) {
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

      if (name === undefined) {
        return h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
      }

      if (readPage > pageCount) {
        return h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
      }

      const book = books.filter((data) => data.id === request.params.id)[0];
      if (book === undefined) {
        return h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
      }

      book.name = name;
      book.year = year;
      book.author = author;
      book.summary = summary;
      book.publisher = publisher;
      book.pageCount = pageCount;
      book.readPage = readPage;
      book.reading = reading;

      return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
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
