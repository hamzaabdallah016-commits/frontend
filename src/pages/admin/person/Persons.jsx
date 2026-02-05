import { useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import usePersons from "../../../hooks/usePersons.js";
import CreatePersonModal from "./components/CreatePersonModal.jsx";
import UpdatePersonModal from "./components/UpdatePersonModal.jsx";
import PersonTable from "./components/PersonTable.jsx";
import Loader from "../../../components/loader/Loader.jsx";
import usePagination from "../../../hooks/usePagination.js";
import Pagination from "../../../components/pagination/Pagination.jsx";

const PersonsPage = () => {
  // Use custom hook
  const {
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
  } = usePersons();

  // Load persons when page loads
  useEffect(() => {
    getAllPersons();
  }, []);

  const ITEMS_PER_PAGE = 5;
  const {
    currentPage,
    currentItems,
    totalPages,
    handlePageChange,
  } = usePagination(persons || [], ITEMS_PER_PAGE);

  if (!persons && !error) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      {/* Show error */}
      {(error  &&!showUpdateModal &&!showCreateModal ) && <Alert variant="danger">{error}</Alert>}

      {/* Page header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Persons List</h1>
        <Button variant="primary" onClick={openCreateModal}>
          Add Person
        </Button>
      </div>

      {/* Persons table */}
      <PersonTable
        persons={currentItems}
        onEdit={openUpdateModal}
        onDelete={deletePerson}
      />

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 mb-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>


      {/* Create modal */}
      <CreatePersonModal
        show={showCreateModal}
        onHide={closeCreateModal}
        personData={personData}
        onInputChange={handleInputChange}
        onSubmit={createPerson}
        error={error}
      />

      {/* Update modal */}
      {selectedPerson && (
        <UpdatePersonModal
          show={showUpdateModal}
          onHide={closeUpdateModal}
          personData={personData}
          onInputChange={handleInputChange}
          onSubmit={updatePerson}
          error={error}
        />
      )}
    </div>
  );
};

export default PersonsPage;
