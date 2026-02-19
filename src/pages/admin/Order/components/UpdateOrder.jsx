// EditOrderModal.jsx
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const EditOrderModal = ({ show, onHide, onSubmit, order, products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    if (order) {
      setSelectedProducts(
        order.products?.map((p) => ({
          product: p.product?._id || p.product,
          quantity: p.quantity,
        })) || []
      );
      setStatus(order.status || "PENDING");
    }
  }, [order]);

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { product: "", quantity: 1 }]);
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
    onSubmit(order._id, {
      products: selectedProducts,
      status: status,
    });
  };

  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Client (Cannot be changed)</Form.Label>
            <Form.Control
              type="text"
              value={order.client?.name || "N/A"}
              disabled
            />
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
              Update Order
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditOrderModal;