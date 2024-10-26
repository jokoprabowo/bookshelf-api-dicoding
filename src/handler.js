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
      let finished = false;

      if (name === undefined) {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
      }

      if (readPage === pageCount) {
        finished = true;
      } else if (readPage > pageCount) {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
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
      const { name, reading, finished } = request.query;
      const bookList = [];

      if (reading !== undefined) {
        books.filter((data) => data.reading === (!!+reading)).forEach((book) => {
          const obj = {};
          obj.id = book.id;
          obj.name = book.name;
          obj.publisher = book.publisher;
          bookList.push(obj);
        });
      } else if (finished !== undefined) {
        books.filter((data) => data.finished === (!!+finished)).forEach((book) => {
          const obj = {};
          obj.id = book.id;
          obj.name = book.name;
          obj.publisher = book.publisher;
          bookList.push(obj);
        });
      } else if (name !== undefined) {
        books.filter((data) => {
          const result = data.name.toLowerCase().match(name.toLowerCase());
          console.log(result);
          return result;
        }).forEach((book) => {
          const obj = {};
          obj.id = book.id;
          obj.name = book.name;
          obj.publisher = book.publisher;
          bookList.push(obj);
        });
      } else {
        books.forEach((data) => {
          const obj = {};
          obj.id = data.id;
          obj.name = data.name;
          obj.publisher = data.publisher;
          bookList.push(obj);
        });
      }

      return h.response({
        status: 'success',
        data: {
          books: bookList,
        },
      }).code(200);
    } catch (error) {
      console.log(error.message);
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

  delete(request, h) {
    try {
      const index = books.findIndex((data) => data.id === request.params.id);

      if (index !== -1) {
        books.splice(index, 1);
        return h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        }).code(200);
      }

      return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      }).code(404);
    } catch (error) {
      return h.response({
        status: 'fail',
        message: 'Gagal mengambil data buku',
      }).code(500);
    }
  },
};

module.exports = booksHandler;
