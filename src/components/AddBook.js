import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book.services";

const AddBook = ({ bookId, setBookId }) => {
  const [flag, setFlag] = useState(true);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [error, setError] = useState({ err: false, errMsg: "" });

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (title === "" || author === "") {
      setError({ err: true, errMsg: "To fill all is required" });
      return;
    }
    const newBook = {
      title,
      author,
      status,
    };
    console.log(newBook);
    try {
      if(bookId !== "undefined" && bookId !== "") {
        await BookDataService.updateBook(bookId, newBook);
        setBookId("");
        setError({err: false, errMsg: "Updated successfully!"})
      }else{
        await BookDataService.addBooks(newBook);
        setError({ err: false, errMsg: "New Book added succesfully!" });
      }
    } catch (e) {
      setError({ err: true, errMsg: e.error });
    }
    setTitle("");
    setAuthor("");
  };

  const editHandler = async () => {
    setError("");
    try {
      const docSnap = await BookDataService.getBook(bookId);
      console.log("About to edit is", docSnap.data());
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (e) {
      setError({ err: true, errMsg: e.error });
    }
  };

  useEffect(() => {
    if (bookId !== undefined && bookId !== "") {
      editHandler();
      console.log("Clicked bookId is: ", bookId);
    }
    // eslint-disable-next-line
  }, [bookId]);

  return (
    <>
      <div className="p-4 box">
        {error.errMsg && (
          <Alert
            variant={error.err ? "danger" : "success"}
            dismissible
            onClose={() => setError("")}
          >
            {error.errMsg}
          </Alert>
        )}
        {/* {error ? <Alert variant="danger">{error.errMsg}</Alert> : <Alert variant="success">{error.errMsg}</Alert>} */}
        <Form onSubmit={submitHandler}>
          {/* Book Titleの入力欄 */}
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">BookTitle</InputGroup.Text>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          {/* Authorの入力欄 */}
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">Author</InputGroup.Text>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          {/* Available or Not Available */}
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(!flag);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(!flag);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add / Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
