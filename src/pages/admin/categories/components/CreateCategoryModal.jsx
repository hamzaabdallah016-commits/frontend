import { Modal, Button, Form, Alert } from "react-bootstrap";

const CreateCategoryModal = ({
  show,
  onHide,
  categoryData,
  onInputChange,
  onSubmit,
  error,
  isLoading,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Category</Modal.Title>
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
              value={categoryData.name || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          {/* Favorite Foods (optionnel) */}
          <Form.Group className="mb-3">
            <Form.Label>description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={categoryData.description || ""}
              onChange={onInputChange}
              placeholder=""
            />
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

export default CreateCategoryModal;