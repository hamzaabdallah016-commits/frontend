import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Alert, Button, Modal } from 'react-bootstrap';

const Menu = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>E-commerce</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => navigate('/admin/categories')}>Categories</Nav.Link>
            <Nav.Link onClick={() => navigate('/admin/products')}>Products</Nav.Link>
            <Nav.Link onClick={() => navigate('/admin/persons')}>Persons</Nav.Link>
            <Nav.Link onClick={() => navigate('/admin/orders')}>Orders</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {error && <Alert variant="danger">{error}</Alert>}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger">Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Menu;
