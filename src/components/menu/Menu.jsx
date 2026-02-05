import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Alert, Button, OverlayTrigger, Tooltip, Badge, Modal } from 'react-bootstrap';
import { LogoutIcon, ProfileIcon, ShopIcon } from "../../assets/icons/Icons.jsx";
import { truncateText } from '../../assets/utils/helpers.js';

const Menu = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">E-commerce</Navbar.Brand>
          <Nav>
            <>
              <Nav.Link onClick={() => navigate('/admin/categories')}>Categories</Nav.Link>
              <Nav.Link onClick={() => navigate('/')}>Products</Nav.Link>
              <Nav.Link onClick={() => navigate('/admin/persons')}>Persons</Nav.Link>
              <Nav.Link onClick={() => navigate('/')}>Orders</Nav.Link>
            </>
          </Nav>
        </Container>
      </Navbar>

      {error && <Alert variant="danger">{error}</Alert>}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={"logout"}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menu;