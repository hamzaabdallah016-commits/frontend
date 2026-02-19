// CreateOrderModal.jsx
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const CreateOrderModal = ({ show, onHide, onSubmit, persons, products }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [status, setStatus] = useState("PENDING");

  const handleAddProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      { product: "", quantity: 1 },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newProducts);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...selectedProducts];
    newProducts[index][field] = value;
    setSelectedProducts(newProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      client: selectedClient,
      products: selectedProducts,
      status: status,
    });
    // Reset form
    setSelectedClient("");
    setSelectedProducts([]);
    setStatus("PENDING");
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select Client</Form.Label>
            <Form.Select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              required
            >
              <option value="">Choose a client...</option>
              {persons?.map((person) => (
                <option key={person._id} value={person._id}>
                  {person.name} - {person.email}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Products</Form.Label>
            {selectedProducts.map((item, index) => (
              <div key={index} className="d-flex gap-2 mb-2">
                <Form.Select
                  value={item.product}
                  onChange={(e) =>
                    handleProductChange(index, "product", e.target.value)
                  }
                  required
                  style={{ flex: 2 }}
                >
                  <option value="">Select Product...</option>
                  {products?.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} - ${product.price}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control
                  type="number"
                  placeholder="Qty"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleProductChange(index, "quantity", parseInt(e.target.value))
                  }
                  required
                  style={{ flex: 1 }}
                />

                <Button
                  variant="danger"
                  onClick={() => handleRemoveProduct(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button variant="secondary" onClick={handleAddProduct}>
              + Add Product
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PENDING">PENDING</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELED">CANCELED</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Order
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOrderModal;