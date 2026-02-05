import { useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import useCategories from "../../../hooks/useCategory.js";
import CreateCategoryModal from "./components/CreateCategoryModal.jsx";
import UpdateCategoryModal from "./components/UpdateCategoryModal.jsx";
import CategoryTable from "./components/CategoryTable.jsx";
import Loader from "../../../components/loader/Loader.jsx";
import usePagination from "../../../hooks/usePagination.js";
import Pagination from "../../../components/pagination/Pagination.jsx";

const CategoriesPage = () => {
  // Use custom hook
  const {
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
  } = useCategories();

  // Load categoriess when page loads
  useEffect(() => {
    getAllCategories();
  }, []);

  const ITEMS_PER_PAGE = 5;
  const { currentPage, currentItems, totalPages, handlePageChange } =
    usePagination(categories || [], ITEMS_PER_PAGE);

  if (!categories && !error) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      {/* Show error */}
      {error && !showUpdateModal && !showCreateModal && (
        <Alert variant="danger">{error}</Alert>
      )}

      {/* Page header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>categories List</h1>
        <Button variant="primary" onClick={openCreateModal}>
          Add Category
        </Button>
      </div>

      {/* categoriess table */}
      <CategoryTable
        categories={currentItems}
        onEdit={openUpdateModal}
        onDelete={deleteCategory}
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
      <CreateCategoryModal
        show={showCreateModal}
        onHide={closeCreateModal}
        categoryData={categoryData}
        onInputChange={handleInputChange}
        onSubmit={createCategory}
        error={error}
      />

      {/* Update modal */}
      {selectedCategory && (
        <UpdateCategoryModal
          show={showUpdateModal}
          onHide={closeUpdateModal}
          categoryData={categoryData}
          onInputChange={handleInputChange}
          onSubmit={updateCategory}
          error={error}
        />
      )}
    </div>
  );
};

export default CategoriesPage;