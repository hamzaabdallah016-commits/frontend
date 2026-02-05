import { Modal, Button, Form, Alert } from "react-bootstrap";

const UpdatePersonModal = ({
  show,
  onHide,
  personData,
  onInputChange,
  onSubmit,
  error,
  isLoading,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update Person</Modal.Title>
        {error && <Alert variant="danger" className="w-100 mt-2">{error}</Alert>}
      </Modal.Header>

      <Modal.Body>
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
              disabled
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
              disabled
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

          {/* Favorite Foods */}
          <Form.Group className="mb-3">
            <Form.Label>Favorite Foods (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="favoriteFoods"
              value={
                Array.isArray(personData.favoriteFoods)
                  ? personData.favoriteFoods.join(", ")
                  : personData.favoriteFoods || ""
              }
              onChange={onInputChange}
            />
          </Form.Group>

          {/* Image URL / Base64 */}
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={personData.image || ""}
              onChange={onInputChange}
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
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              Update
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePersonModal;
