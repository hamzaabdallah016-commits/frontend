// OrderTable.jsx
import { Table, Button, Badge } from "react-bootstrap";
import { EditIcon, DeleteIcon } from "../../../../assets/icons/Icons.jsx";
import { truncateText } from "../../../../assets/utils/helpers.js";

const OrderTable = ({ orders, onViewDetails, onEdit, onDelete }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Client Name</th>
          <th>Products Count</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order._id}>
              <td>{truncateText(order._id, 10)}</td>
              <td>{order.client?.name || "N/A"}</td>
              <td>{order.products?.length || 0}</td>
              <td>${order.total?.toFixed(2) || "0.00"}</td>
              <td>
                <Badge bg={getStatusBadge(order.status)}>
                  {order.status}
                </Badge>
              </td>
              <td>{order.createdAt ? formatDate(order.createdAt) : "N/A"}</td>
              <td className="d-flex gap-2">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => onViewDetails(order)}
                >
                  View
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onEdit(order)}
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(order._id)}
                  disabled={order.status !== "CANCELED"}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No orders found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default OrderTable;