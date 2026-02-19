import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    categoryId: "",
    stock: 0,
  });

  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // 🔹 Get all Products
  const getAllProducts = async () => {
    try {
      setError("");
      const { data } = await axios.get(`${API_URL}/products`);
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch products");
    }
  };

  // 🔹 Create Product (FIXED)
  const createProduct = async () => {
    try {
      console.log(localStorage.getItem("token"));
      setError("");
      await axios.post(
        `${API_URL}/products/new`,
        productData,
        getAuthHeaders()
      );
      closeCreateModal();
      getAllProducts();
    } catch (err) {
      console.log("Error creating Product:", err);
      setError(err.response?.data?.message || "Failed to create Product");
    }
  };

  // 🔹 Update Product (FIXED)
  const updateProduct = async () => {
    if (!selectedProduct) return;

    try {
      setError("");
      await axios.put(
        `${API_URL}/products/${selectedProduct._id}`,
        productData,
        getAuthHeaders()
      );
      closeUpdateModal();
      getAllProducts();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update product");
    }
  };

  // 🔹 Delete Product (FIXED)
  const deleteProduct = async (id) => {
    try {
      setError("");
      await axios.delete(`${API_URL}/products/${id}`, getAuthHeaders());
      getAllProducts();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete product");
    }
  };

  // 🔹 Modals
  const resetForm = () => {
    setProductData({
      name: "",
      description: "",
      price: 0,
      image: "",
      categoryId: "",
      stock: 0,
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

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      categoryId: product.categoryId,
      stock: product.stock,
    });
    setShowUpdateModal(true);
    setError("");
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
    setShowUpdateModal(false);
    resetForm();
  };

  // 🔹 Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  return {
    products,
    productData,
    error,
    showCreateModal,
    showUpdateModal,
    selectedProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    openCreateModal,
    closeCreateModal,
    openUpdateModal,
    closeUpdateModal,
    handleInputChange,
  };
};

export default useProducts;
