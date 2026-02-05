import { Modal, Button, Form, Alert } from "react-bootstrap";

const CreatePersonModal = ({
  show,
  onHide,
  personData,
  onInputChange,
  onSubmit,
  error,
  isLoading
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Person</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={personData.name || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Age */}
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              min={0}
              value={personData.age || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={personData.email || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={personData.password || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={personData.phone || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Delivery Address */}
          <Form.Group className="mb-3">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control
              type="text"
              name="deliveryAddress"
              value={personData.deliveryAddress || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Favorite Foods (optionnel) */}
          <Form.Group className="mb-3">
            <Form.Label>Favorite Foods (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="favoriteFoods"
              value={personData.favoriteFoods || ""}
              onChange={onInputChange}
              placeholder="pizza, pasta, burger"
            />
          </Form.Group>

          {/* Role */}
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={personData.role || "CUSTOMER"}
              onChange={onInputChange}
            >
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              Create
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePersonModal;
