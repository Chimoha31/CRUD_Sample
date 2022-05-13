import React, { useState } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book.services"

const AddBook = () => {
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
      await BookDataService.addBooks(newBook);
      setError({ err: false, errMsg: "New Book added succesfully!" });
    } catch (e) {
      setError({ err: true, errMsg: e.error });
    }
    setTitle("");
    setAuthor("");
  };

  return (
    <>
      <div className="p-4 box">
        {error.err && <Alert variant="danger">{error.errMsg}</Alert>}
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
                setFlag(false);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
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
