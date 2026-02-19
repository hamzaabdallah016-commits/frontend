import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useEffect } from "react";
import useCategories from "../../../../hooks/useCategory";

const UpdateProductModal = ({
  show,
  onHide,
  productData,
  onInputChange,
  onSubmit,
  error,
  isLoading,
}) => {
  const { categories, getAllCategories } = useCategories();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
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
              value={productData.name || ""}
              disabled
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={productData.description || ""}
              onChange={onInputChange}
            />
          </Form.Group>

          {/* Price */}
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

          {/* Stock */}
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

          {/* Image */}
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={productData.image || ""}
              onChange={onInputChange}
            />
          </Form.Group>

          {/* Category */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={productData.categoryId || ""}
              onChange={onInputChange}
              required
            >
              <option value="">Select category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
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

export default UpdateProductModal;