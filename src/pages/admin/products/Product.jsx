import { useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import useProducts from "../../../hooks/usePorduct";
import CreateProductModal from "./components/CreateProductModal.jsx";
import UpdateProductModal from "./components/UpdateProductModal.jsx";
import ProductTable from "./components/PorductTble.jsx";
import Loader from "../../../components/loader/Loader.jsx";
import usePagination from "../../../hooks/usePagination.js";
import Pagination from "../../../components/pagination/Pagination.jsx";

const Products = () => {
  const {
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
  } = useProducts();

  // Load products when page loads
  useEffect(() => {
    getAllProducts();
  }, []);

  const ITEMS_PER_PAGE = 6;
  const {
    currentPage,
    currentItems,
    totalPages,
    handlePageChange,
  } = usePagination(products || [], ITEMS_PER_PAGE);

  if (!products && !error) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">

      {/* Show error */}
      {error && !showCreateModal && !showUpdateModal && (
        <Alert variant="danger">{error}</Alert>
      )}

      {/* Page header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Products</h1>
        <Button variant="primary" onClick={openCreateModal}>
          Add Product
        </Button>
      </div>

      {/* Products Table */}
      <ProductTable
        products={currentItems}
        onEdit={openUpdateModal}
        onDelete={deleteProduct}
      />

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 mb-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Create Modal */}
      <CreateProductModal
        show={showCreateModal}
        onHide={closeCreateModal}
        productData={productData}
        onInputChange={handleInputChange}
        onSubmit={createProduct}
        error={error}
        // categories={categories}
      />

      {/* Update Modal */}
      {selectedProduct && (
        <UpdateProductModal
          show={showUpdateModal}
          onHide={closeUpdateModal}
          productData={productData}
          onInputChange={handleInputChange}
          onSubmit={updateProduct}
          error={error}
          // categories={categories}
        />
      )}
    </div>
  );
};

export default Products;
