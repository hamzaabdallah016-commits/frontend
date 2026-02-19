// src/pages/admin/Order/Orders.jsx
import { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import OrderTable from "./components/OrderTable.jsx";
import CreateOrderModal from "./components/CreatOrder.jsx";
import OrderDetailsModal from "./components/DeleteOrderModal.jsx";
import EditOrderModal from "./components/UpdateOrder.jsx";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [persons, setPersons] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ✅ CORRECT API URL
  const API_URL = "http://localhost:4000/api";

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/orders`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      
      const data = await response.json();
      console.log("Orders fetched:", data);
      setOrders(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders: " + err.message);
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all persons
  const fetchPersons = async () => {
    try {
      const response = await fetch(`${API_URL}/persons`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch persons");
      }
      
      const data = await response.json();
      console.log("Persons fetched:", data);
      setPersons(data);
    } catch (err) {
      console.error("Failed to fetch persons:", err);
      setError("Failed to fetch persons: " + err.message);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      
      const data = await response.json();
      console.log("Products fetched:", data);
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to fetch products: " + err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchPersons();
    fetchProducts();
  }, []);

  // Create order
  const handleCreateOrder = async (orderData) => {
    try {
      console.log("Creating order with data:", orderData);
      
      const response = await fetch(`${API_URL}/orders/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const newOrder = await response.json();
      console.log("Order created:", newOrder);
      setSuccess("Order created successfully!");
      setShowCreateModal(false);
      fetchOrders();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Error creating order:", err);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Update order
  const handleUpdateOrder = async (orderId, updateData) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order");
      }

      setSuccess("Order updated successfully!");
      setShowEditModal(false);
      fetchOrders();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Delete order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order? (Only CANCELED orders can be deleted)")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order");
      }

      setSuccess("Order deleted successfully!");
      fetchOrders();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // View order details
  const handleViewDetails = async (order) => {
    try {
      const response = await fetch(`${API_URL}/orders/${order._id}`);
      const detailedOrder = await response.json();
      setSelectedOrder(detailedOrder);
      setShowDetailsModal(true);
    } catch (err) {
      setError("Failed to fetch order details");
    }
  };

  // Edit order
  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Management</h2>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          + Create New Order
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Debug info */}
      <div className="mb-3">
        <small className="text-muted">
          Persons loaded: {persons.length} | Products loaded: {products.length}
        </small>
      </div>

      {loading ? (
        <div className="text-center">Loading orders...</div>
      ) : (
        <OrderTable
          orders={orders}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDeleteOrder}
        />
      )}

      <CreateOrderModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSubmit={handleCreateOrder}
        persons={persons}
        products={products}
      />

      <OrderDetailsModal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        order={selectedOrder}
      />

      <EditOrderModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSubmit={handleUpdateOrder}
        order={selectedOrder}
        products={products}
      />
    </Container>
  );
};

export default OrdersPage;