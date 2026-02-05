import { useState } from "react";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:4000/api";
const useCategories = () => {
  const [categories, setCategories] = useState();
  // State for form data
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    image: "",
  });

  // State to handle errors
  const [error, setError] = useState("");
  // State to show/hide modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // State for Category selected for update
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 🔹 Get all Categorys
  const getAllCategories = async () => {
    try {
      setError("");
      const response = await axios.get(`${API_URL}/category`);
      setCategories(response.data);
    } catch (err) {
      console.log("Error fetching Categories:", err);
      setError(err.response?.data?.message || "Failed to fetch Categories");
    }
  };

  // 🔹 Create a new Category
  const createCategory = async () => {
    try {
      setError("");
      await axios.post(`${API_URL}/category/new`, categoryData);
      closeCreateModal();
      getAllCategories();
    } catch (err) {
      console.log("Error creating Category:", err);
      setError("Failed to create Category");
    }
  };

  // 🔹 Update an existing Category
  const updateCategory = async () => {
    if (!selectedCategory) return;
    try {
      setError("");
      await axios.put(
        `${API_URL}/category/${selectedCategory._id}`,
        categoryData
      );
      closeUpdateModal();
      getAllCategories();
    } catch (err) {
      console.log("Error updating Category:", err);
      setError("Failed to update Category");
    }
  };

  // 🔹 Delete a Category
  const deleteCategory = async (id) => {
    try {
      setError("");
      await axios.delete(`${API_URL}/category/${id}`);
      getAllCategories();
    } catch (err) {
      console.log("Error deleting category:", err);
      setError("Failed to delete Category");
    }
  };

  // 🔹 Open create modal
  const openCreateModal = () => {
    setCategoryData({
      name: "",
      description: "",
      image: "",
    });
    setShowCreateModal(true);
    setError("");
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setCategoryData({
      name: "",
      description: "",
      image: "",
    });
    setError("");
  };

  // 🔹 Open update modal
  const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setCategoryData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setShowUpdateModal(true);
    setError("");
  };

  const closeUpdateModal = () => {
    setSelectedCategory(null);
    setShowUpdateModal(false);
    setCategoryData({
      name: "",
      description: "",
      image: "",
    });
    setError("");
  };

    // 🔹 Handle form input change
    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setCategoryData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  return {
    categories,
    categoryData,
    error,
    showCreateModal,
    showUpdateModal,
    selectedCategory,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    openCreateModal,
    closeCreateModal,
    openUpdateModal,
    closeUpdateModal,
    handleInputChange,
  };
};

export default useCategories;