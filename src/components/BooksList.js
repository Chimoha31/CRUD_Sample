import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../services/book.services";

const BooksList = ({getBookIdHandler}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    // 削除した後はbooklistをリフレッシュしたい為、getBooks()をもう一度ここで呼び出す。
    getBooks();
  }

  return (
    <>
    <Button variant="dark" onClick={(e) => getBooks()}>
      Refresh
    </Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.status}</td>
              <td>
                <Button
                  variant="secondary"
                  className="edit"
                  onClick={(e) => getBookIdHandler(book.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="delete"
                  onClick={(e) => deleteHandler(book.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default BooksList;
