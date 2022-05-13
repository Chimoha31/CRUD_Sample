import React, { Fragment, useState } from "react";
import AddBook from "./components/AddBook";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import BooksList from "./components/BooksList";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
    console.log("Id for edit: ", id);
    setBookId(id)
  }

  return (
    <Fragment>
      <Navbar bg="black" className="header">
        <Container>
          <Navbar.Brand href="#home" className="text-light">Library - Firebase CRUD -</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{width: "400px"}}>
        <Row>
          <Col>
            <AddBook bookId={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <BooksList getBookIdHandler={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default App;
