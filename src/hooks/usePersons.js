import { useState } from "react";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:4000/api";
const usePersons = () => {
  // State to store all persons
  const [persons, setPersons] = useState();
  // State for form data
  const [personData, setPersonData] = useState(
    { name: "",
      email: "",
      age: "",
      phone: "",
      deliveryAddress: "",
      image: "",
      role: "CUSTOMER",
      favoriteFoods: []
   });

  // State to handle errors
  const [error, setError] = useState("");
  // State to show/hide modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // State for person selected for update
  const [selectedPerson, setSelectedPerson] = useState(null);

  // 🔹 Get all persons
  const getAllPersons = async () => {
    try {
      setError("");
      const response = await axios.get(`${API_URL}/persons`);
      setPersons(response.data);
    } catch (err) {
      console.log("Error fetching persons:", err);
      setError(err.response?.data?.message || "Failed to fetch persons");
    }
  };

  // 🔹 Create a new person
  const createPerson = async () => {
    try {
      setError("");
      await axios.post(`${API_URL}/persons/new`, personData);
      closeCreateModal();
      getAllPersons();
    } catch (err) {
      console.log("Error creating person:", err);
      setError("Failed to create person");
    }
  };

  // 🔹 Update an existing person
  const updatePerson = async () => {
    if (!selectedPerson) return;
    try {
      setError("");
      await axios.put(`${API_URL}/persons/${selectedPerson._id}`, personData);
      closeUpdateModal();
      getAllPersons();
    } catch (err) {
      console.log("Error updating person:", err);
      setError("Failed to update person");
    }
  };

  // 🔹 Delete a person
  const deletePerson = async (id) => {
    try {
      setError("");
      await axios.delete(`${API_URL}/persons/${id}`);
      getAllPersons();
    } catch (err) {
      console.log("Error deleting person:", err);
      setError("Failed to delete person");
    }
  };

  // 🔹 Open create modal
  const openCreateModal = () => {
    setPersonData(
      { name: "",
        email: "",
        password: "",
        age: "",
        phone: "",
        deliveryAddress: "",
        image: "",
        role: "CUSTOMER",
        favoriteFoods: []
      });
    setShowCreateModal(true);
    setError("");
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setPersonData({
       name: "",
      email: "",
      age: "",
      phone: "",
      deliveryAddress: "",
      image: "",
      role: "CUSTOMER",
      favoriteFoods: [] });
    setError("");
  };

  // 🔹 Open update modal
  const openUpdateModal = (person) => {
    setSelectedPerson(person);
    setPersonData(
      { name: person.name,
        email: person.email,
        age: person.age,
        phone: person.phone,
        deliveryAddress: person.deliveryAddress,
        image: person.image,
        role: person.role,
        favoriteFoods: person.favoriteFoods
      });
    setShowUpdateModal(true);
    setError("");
  };

  const closeUpdateModal = () => {
    setSelectedPerson(null);
    setShowUpdateModal(false);
     setPersonData({
       name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
      deliveryAddress: "",
      image: "",
      role: "CUSTOMER",
      favoriteFoods: [] });
    setError("");
  };

  // 🔹 Handle form input change
const handleInputChange = (e) => {
  const { name, value } = e.target;

  setPersonData((prev) => ({
    ...prev,
    [name]:
      name === "age"
        ? Number(value)
        : name === "favoriteFoods"
        ? value.split(",").map(f => f.trim())
        : value,
  }));
};



  return {
    persons,
    personData,
    error,
    showCreateModal,
    showUpdateModal,
    selectedPerson,
    getAllPersons,
    createPerson,
    updatePerson,
    deletePerson,
    openCreateModal,
    closeCreateModal,
    openUpdateModal,
    closeUpdateModal,
    handleInputChange,
  };
};

export default usePersons;