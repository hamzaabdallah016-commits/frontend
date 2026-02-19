import { Table, Button, Badge } from "react-bootstrap";
import { EditIcon, DeleteIcon } from "../../../../assets/icons/Icons.jsx";
import { truncateText } from "../../../../assets/utils/helpers.js";
import useCategories from "../../../../hooks/useCategory.js";
import { useEffect } from "react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  const {getCategoryNameById, getAllCategories} = useCategories()
   
  useEffect(() => {
    
    getAllCategories()
  }, []);
  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Image</th>
          <th>Description</th>
          <th>In Stock</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products && products.length > 0 ? (
          products.map((product) => (
            <tr key={product._id}>
              <td>{truncateText(product.name, 20)}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>

              <td>
              {getCategoryNameById(product.categoryId)}
              </td>

              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  "N/A"
                )}
              </td>

              <td>{truncateText(product.description || "", 25)}</td>

              <td>
                <Badge bg={product.inStock ? "success" : "danger"}>
                  {product.inStock ? "Yes" : "No"}
                </Badge>
              </td>

              <td className="d-flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onEdit(product)}
                >
                  <EditIcon />
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(product._id)}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No products found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ProductTable;
