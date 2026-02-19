// OrderDetailsModal.jsx
import { Modal, Button, Table, Badge } from "react-bootstrap";

const OrderDetailsModal = ({ show, onHide, order }) => {
  if (!order) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case "DELIVERED":
        return "success";
      case "PENDING":
        return "warning";
      case "CANCELED":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <h5>Order Information</h5>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> <Badge bg={getStatusBadge(order.status)}>{order.status}</Badge></p>
          <p><strong>Total:</strong> ${order.total?.toFixed(2)}</p>
        </div>

        <div className="mb-3">
          <h5>Client Information</h5>
          <p><strong>Name:</strong> {order.client?.name || "N/A"}</p>
          <p><strong>Email:</strong> {order.client?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {order.client?.phone || "N/A"}</p>
          <p><strong>Delivery Address:</strong> {order.client?.deliveryAddress || "N/A"}</p>
        </div>

        <div className="mb-3">
          <h5>Products</h5>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.products?.map((item, index) => (
                <tr key={index}>
                  <td>{item.product?.name || "N/A"}</td>
                  <td>${item.product?.price?.toFixed(2) || "0.00"}</td>
                  <td>{item.quantity}</td>
                  <td>${((item.product?.price || 0) * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;