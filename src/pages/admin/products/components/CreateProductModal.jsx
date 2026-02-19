import { Modal, Button, Form, Alert } from "react-bootstrap";
import useCategories from "../../../../hooks/useCategory";
import { useEffect } from "react";

const CreateProductModal = ({
  show,
  onHide,
  productData,
  onInputChange,
  onSubmit,
  error,
  isLoading,
}) => {

  const { categories, getAllCategories } = useCategories()

  useEffect(() => {
    getAllCategories()
  }, []);


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData.name || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={productData.description || ""}
              onChange={onInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={productData.price || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={productData.stock || ""}
              onChange={onInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={productData.image || ""}
              onChange={onInputChange}
            />
          </Form.Group>

          {/* category */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={productData.categoryId || ""}

              onChange={onInputChange}
            >

              <option value="">Select category</option>
              {categories?.map((category, index) => <option key={index} value={category._id}>{category.name}</option>)}
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

export default CreateProductModal;