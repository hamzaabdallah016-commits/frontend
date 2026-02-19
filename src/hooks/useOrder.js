import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [orderData, setOrderData] = useState({
    customerId: "",
    customerName: "",
    customerEmail: "",
    items: [],
    status: "PENDING",
    paymentStatus: "PENDING",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    notes: "",
  });

  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Get all orders
  const getAllOrders = async () => {
    try {
      setError("");
      const { data } = await axios.get(`${API_URL}/orders`);
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch orders");
    }
  };

  // Get order statistics
  const getOrderStats = async () => {
    try {
      setError("");
      const { data } = await axios.get(`${API_URL}/orders/stats`);
      setStats(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch stats");
    }
  };

  // Create order
  const createOrder = async () => {
    try {
      setError("");
      await axios.post(`${API_URL}/orders/new`, orderData);
      closeCreateModal();
      getAllOrders();
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err.response?.data?.error || "Failed to create order");
    }
  };

  // Update order
  const updateOrder = async () => {
    if (!selectedOrder) return;

    try {
      setError("");
      await axios.put(`${API_URL}/orders/${selectedOrder._id}`, orderData);
      closeUpdateModal();
      getAllOrders();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to update order");
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      setError("");
      await axios.delete(`${API_URL}/orders/${id}`);
      getAllOrders();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to delete order");
    }
  };

  // Update order status
  const updateOrderStatus = async (id, status) => {
    try {
      setError("");
      await axios.put(`${API_URL}/orders/${id}`, { status });
      getAllOrders();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to update status");
    }
  };

  // Modals
  const resetForm = () => {
    setOrderData({
      customerId: "",
      customerName: "",
      customerEmail: "",
      items: [],
      status: "PENDING",
      paymentStatus: "PENDING",
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      notes: "",
    });
  };

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
    setError("");
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    resetForm();
  };

  const openUpdateModal = (order) => {
    setSelectedOrder(order);
    setOrderData({
      customerId: order.customerId._id || order.customerId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: order.items,
      status: order.status,
      paymentStatus: order.paymentStatus,
      shippingAddress: order.shippingAddress,
      notes: order.notes || "",
    });
    setShowUpdateModal(true);
    setError("");
  };

  const closeUpdateModal = () => {
    setSelectedOrder(null);
    setShowUpdateModal(false);
    resetForm();
  };

  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setSelectedOrder(null);
    setShowDetailsModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("shippingAddress.")) {
      const field = name.split(".")[1];
      setOrderData((prev) => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value,
        },
      }));
    } else {
      setOrderData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return {
    orders,
    stats,
    orderData,
    error,
    showCreateModal,
    showUpdateModal,
    showDetailsModal,
    selectedOrder,
    getAllOrders,
    getOrderStats,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
    openCreateModal,
    closeCreateModal,
    openUpdateModal,
    closeUpdateModal,
    openDetailsModal,
    closeDetailsModal,
    handleInputChange,
    setOrderData,
  };
};

export default useOrders;
