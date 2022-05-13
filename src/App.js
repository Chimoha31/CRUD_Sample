import React, { Fragment } from "react";
import AddBook from "./components/AddBook";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import BooksList from "./components/BooksList";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
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
            <AddBook />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <BooksList />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default App;
