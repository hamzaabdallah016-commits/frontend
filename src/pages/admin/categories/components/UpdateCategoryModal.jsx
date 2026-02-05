import { Modal, Button, Form, Alert } from "react-bootstrap";

const UpdateCategoryModal = ({
  show,
  onHide,
  categoryData,
  onInputChange,
  onSubmit,
  error,
  isLoading,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update category</Modal.Title>
        {error && (
          <Alert variant="danger" className="w-100 mt-2">
            {error}
          </Alert>
        )}
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
              value={categoryData.name || ""}
              disabled
            />
          </Form.Group>

          {/* Delivery Address */}
          <Form.Group className="mb-3">
            <Form.Label> description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={categoryData.description || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Image URL / Base64 */}
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={categoryData.image || ""}
              onChange={onInputChange}
            />
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

export default UpdateCategoryModal;